import { supabase, isSupabaseConfigured } from './supabaseClient';
import { initialPortfolioData } from '../data/portfolioData';
import { servicesData as initialServicesData } from '../data/servicesData';

// Fetch Portfolio Projects (Supabase DB OR LocalStorage)
export async function fetchProjects() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Map database column live_url to liveUrl
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
