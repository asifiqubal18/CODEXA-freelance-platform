import { supabase, isSupabaseConfigured } from './supabaseClient';
import { initialPortfolioData } from '../data/portfolioData';
import { servicesData as initialServicesData } from '../data/servicesData';

// Seed Initial Services to Supabase if empty
async function seedServicesIfEmpty() {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    const { count } = await supabase.from('services').select('*', { count: 'exact', head: true });
    if (count === 0) {
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
  } catch (e) {
    console.warn('Seed services error:', e);
  }
}

// Seed Initial Projects to Supabase if empty
async function seedProjectsIfEmpty() {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    const { count } = await supabase.from('projects').select('*', { count: 'exact', head: true });
    if (count === 0) {
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
  } catch (e) {
    console.warn('Seed projects error:', e);
  }
}

// Fetch Portfolio Projects (Supabase DB OR LocalStorage)
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
    } catch (e) {
      console.warn('Supabase fetch error, using local data:', e);
    }
  }

  // Fallback to LocalStorage + Initial Data
  try {
    const savedProjects = localStorage.getItem('codexa_projects_list');
    if (savedProjects) {
      return JSON.parse(savedProjects);
    }
  } catch (e) {}
  return initialPortfolioData;
}

// Create New Portfolio Project
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

      if (error) {
        console.error('Supabase project insert error:', error.message);
      }
    } catch (e) {
      console.error('Supabase project insert exception:', e);
    }
  }
}

// Delete Portfolio Project
export async function deleteProjectFromDB(projId) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projId);

      if (error) {
        console.error('Supabase project delete error:', error.message);
      }
    } catch (e) {
      console.error('Supabase project delete exception:', e);
    }
  }
}

// Fetch Agency Services
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
    } catch (e) {
      console.warn('Supabase services fetch error:', e);
    }
  }

  // Fallback to LocalStorage + Initial Data
  try {
    const savedServices = localStorage.getItem('codexa_custom_services');
    if (savedServices) {
      return JSON.parse(savedServices);
    }
  } catch (e) {}
  return initialServicesData;
}

// Update Service Rate / Scope
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

      if (error) {
        console.error('Supabase service update error:', error.message);
      }
    } catch (e) {
      console.error('Supabase service update exception:', e);
    }
  }
}
