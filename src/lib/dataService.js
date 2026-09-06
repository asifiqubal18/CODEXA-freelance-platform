import { supabase, isSupabaseConfigured } from './supabaseClient';
import { initialPortfolioData } from '../data/portfolioData';
import { servicesData as initialServicesData } from '../data/servicesData';

// Seed Initial Services to Supabase if empty
async function seedServicesIfEmpty() {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    const { count, error } = await supabase.from('services').select('*', { count: 'exact', head: true });
    if (!error && count === 0) {
      const dbServices = initialServicesData.map(s => ({
        id: s.id,
        category: s.category,
        title: s.title,
        icon_name: s.iconName,
        short_desc: s.shortDesc,
        base_price_usd: s.basePriceUSD,
        timeline: s.timeline,
        popular: s.popular,
        tech_stack: s.techStack,
        features: s.features,
        detailed_description: s.detailedDescription
      }));
      await supabase.from('services').insert(dbServices);
    }
  } catch (e) {}
}

// Seed Initial Projects to Supabase if empty
async function seedProjectsIfEmpty() {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    const { count, error } = await supabase.from('projects').select('*', { count: 'exact', head: true });
    if (!error && count === 0) {
      const dbProjects = initialPortfolioData.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        client: p.client,
        description: p.description,
        image: p.image,
        tags: p.tags,
        metrics: p.metrics,
        live_url: p.liveUrl,
        featured: p.featured,
        is_custom_added: false
      }));
      await supabase.from('projects').insert(dbProjects);
    }
  } catch (e) {}
}

// 1. PROJECTS
export async function fetchProjects() {
  if (isSupabaseConfigured && supabase) {
    try {
      await seedProjectsIfEmpty();
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(p => ({
          ...p,
          liveUrl: p.live_url || p.liveUrl,
          isCustomAdded: p.is_custom_added
        }));
      }
    } catch (e) {}
  }

  try {
    const savedProjects = localStorage.getItem('codexa_projects_list');
    if (savedProjects) return JSON.parse(savedProjects);
  } catch (e) {}
  return initialPortfolioData;
}

export async function createProject(project) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          id: project.id,
          title: project.title,
          category: project.category,
          client: project.client,
          description: project.description,
          image: project.image,
          tags: project.tags,
          metrics: project.metrics,
          live_url: project.liveUrl,
          featured: project.featured || false,
          is_custom_added: true
        }]);
      if (error) return { success: false, error: error.message };
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  return { success: true };
}

export async function deleteProjectFromDB(projId) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projId);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  return { success: true };
}

// 2. SERVICES
export async function fetchServices() {
  if (isSupabaseConfigured && supabase) {
    try {
      await seedServicesIfEmpty();
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('id');

      if (!error && data && data.length > 0) {
        return data.map(s => ({
          ...s,
          basePriceUSD: Number(s.base_price_usd || s.basePriceUSD),
          shortDesc: s.short_desc || s.shortDesc,
          iconName: s.icon_name || s.iconName,
          techStack: s.tech_stack || s.techStack,
          detailedDescription: s.detailed_description || s.detailedDescription
        }));
      }
    } catch (e) {}
  }

  try {
    const savedServices = localStorage.getItem('codexa_custom_services');
    if (savedServices) return JSON.parse(savedServices);
  } catch (e) {}
  return initialServicesData;
}

export async function updateServiceInDB(service) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('services')
        .update({
          title: service.title,
          base_price_usd: service.basePriceUSD,
          timeline: service.timeline,
          short_desc: service.shortDesc
        })
        .eq('id', service.id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  return { success: true };
}

// 3. CONTACT INFO
export async function fetchContactInfoFromDB() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .eq('id', 'main')
        .single();
      if (!error && data) return data;
    } catch (e) {}
  }
  try {
    const saved = localStorage.getItem('codexa_contact_info');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return {
    email: 'hello@codexa.io',
    phone: '+1 (800) 555-CODEXA',
    guarantee: 'Within 4 Business Hours',
    availability: 'Available for Q3/Q4 Project Bookings'
  };
}

export async function updateContactInfoInDB(contact) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('contact_info')
        .upsert({
          id: 'main',
          email: contact.email,
          phone: contact.phone,
          guarantee: contact.guarantee,
          availability: contact.availability
        });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  return { success: true };
}

// 4. ESTIMATOR CONFIG PRICING MATRIX
export async function fetchEstimatorConfigFromDB() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('estimator_config')
        .select('*')
        .eq('id', 'default')
        .single();

      if (!error && data) {
        return {
          platforms: {
            'web-app': Number(data.web_app_price),
            'mobile-app': Number(data.mobile_app_price),
            'ecommerce': Number(data.ecommerce_price),
            'ai-automation': Number(data.ai_automation_price),
            'full-platform': Number(data.full_platform_price)
          },
          features: {
            'auth': Number(data.auth_price),
            'payments': Number(data.payments_price),
            'admin': Number(data.admin_price),
            'ai': Number(data.ai_feature_price)
          }
        };
      }
    } catch (e) {}
  }
  try {
    const saved = localStorage.getItem('codexa_estimator_config');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return {
    platforms: { 'web-app': 2400, 'mobile-app': 3200, 'ecommerce': 2800, 'ai-automation': 3000, 'full-platform': 5500 },
    features: { 'auth': 400, 'payments': 500, 'admin': 650, 'ai': 800 }
  };
}

export async function updateEstimatorConfigInDB(config) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('estimator_config')
        .upsert({
          id: 'default',
          web_app_price: config.platforms['web-app'],
          mobile_app_price: config.platforms['mobile-app'],
          ecommerce_price: config.platforms['ecommerce'],
          ai_automation_price: config.platforms['ai-automation'],
          full_platform_price: config.platforms['full-platform'],
          auth_price: config.features['auth'],
          payments_price: config.features['payments'],
          admin_price: config.features['admin'],
          ai_feature_price: config.features['ai']
        });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  return { success: true };
}

// 5. CLIENT CONSULTATION INQUIRIES
export async function submitInquiryToDB(inquiry) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          name: inquiry.name,
          email: inquiry.email,
          service_type: inquiry.serviceType,
          budget_range: inquiry.budgetRange,
          message: inquiry.message,
          status: 'new'
        }]);
      if (error) return { success: false, error: error.message };
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  return { success: true };
}
