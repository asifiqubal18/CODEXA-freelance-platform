import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import ProjectEstimator from './components/ProjectEstimator';
import PortfolioSection from './components/PortfolioSection';
import AddProjectModal from './components/AddProjectModal';
import EditServiceModal from './components/EditServiceModal';
import EditContactModal from './components/EditContactModal';
import EditTechModal from './components/EditTechModal';
import EditEstimatorModal from './components/EditEstimatorModal';
import ProcessSection from './components/ProcessSection';
import TechStackSection from './components/TechStackSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';

import AuthModal from './components/AuthModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { 
  fetchProjects, 
  createProject, 
  deleteProjectFromDB, 
  fetchServices, 
  updateServiceInDB,
  fetchContactInfoFromDB,
  updateContactInfoInDB,
  fetchEstimatorConfigFromDB,
  updateEstimatorConfigInDB
} from './lib/dataService';

const INITIAL_TECH_ITEMS = [
  { name: 'React.js', cat: 'Frontend', level: 'Expert', desc: 'Component architecture & Web Vitals' },
  { name: 'Next.js 14', cat: 'Frontend', level: 'Expert', desc: 'SSR, App Router & Server Actions' },
  { name: 'TypeScript', cat: 'Frontend', level: 'Expert', desc: 'Type-safe enterprise applications' },
  { name: 'React Native', cat: 'Mobile', level: 'Expert', desc: 'Cross-platform native iOS & Android' },
  { name: 'Flutter & Dart', cat: 'Mobile', level: 'Advanced', desc: 'High-performance 60fps mobile UI' },
  { name: 'Swift & Kotlin', cat: 'Mobile', level: 'Advanced', desc: 'Native device hardware modules' },
  { name: 'Node.js & Express', cat: 'Backend & DB', level: 'Expert', desc: 'RESTful & GraphQL microservices' },
  { name: 'Python & FastAPI', cat: 'Backend & DB', level: 'Expert', desc: 'High-speed AI backends & data APIs' },
  { name: 'PostgreSQL & Redis', cat: 'Backend & DB', level: 'Expert', desc: 'Relational data & high-speed caching' },
  { name: 'OpenAI API & GPT-4', cat: 'AI & Machine Learning', level: 'Expert', desc: 'LLM fine-tuning & prompt engineering' },
  { name: 'LangChain & Pinecone', cat: 'AI & Machine Learning', level: 'Advanced', desc: 'RAG vector databases & AI Agents' },
  { name: 'AWS & Serverless', cat: 'Cloud & DevOps', level: 'Expert', desc: 'Lambda, S3, CloudFront & ECS' },
  { name: 'Docker & Kubernetes', cat: 'Cloud & DevOps', level: 'Advanced', desc: 'Microservice containerization' },
  { name: 'GitHub Actions', cat: 'Cloud & DevOps', level: 'Expert', desc: 'Automated CI/CD pipelines' }
];

function MainAppContent() {
  const { isAdmin, isAuthModalOpen, setIsAuthModalOpen } = useAuth();

  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('codexa_theme') || 'dark';
  });

  // Currency State
  const [currency, setCurrency] = useState('USD');

  // Admin Modals Visibility State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [isEstimatorModalOpen, setIsEstimatorModalOpen] = useState(false);

  // Services State
  const [services, setServices] = useState([]);
  
  // Portfolio State
  const [projects, setProjects] = useState([]);

  // Contact Info State
  const [contactInfo, setContactInfo] = useState({
    email: 'hello@codexa.io',
    phone: '+1 (800) 555-CODEXA',
    guarantee: 'Within 4 Business Hours',
    availability: 'Available for Q3/Q4 Project Bookings'
  });

  // Tech Items State
  const [techItems, setTechItems] = useState(() => {
    try {
      const saved = localStorage.getItem('codexa_tech_items');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_TECH_ITEMS;
  });

  // Estimator Config Pricing Matrix State
  const [estimatorConfig, setEstimatorConfig] = useState({
    platforms: { 'web-app': 2400, 'mobile-app': 3200, 'ecommerce': 2800, 'ai-automation': 3000, 'full-platform': 5500 },
    features: { 'auth': 400, 'payments': 500, 'admin': 650, 'ai': 800 }
  });

  // Contact Form Prefills
  const [selectedService, setSelectedService] = useState(null);
  const [prefilledEstimate, setPrefilledEstimate] = useState(null);

  // Load Data on Mount
  useEffect(() => {
    async function loadData() {
      const loadedServices = await fetchServices();
      setServices(loadedServices);

      const loadedProjects = await fetchProjects();
      setProjects(loadedProjects);

      const loadedContact = await fetchContactInfoFromDB();
      if (loadedContact) setContactInfo(loadedContact);

      const loadedConfig = await fetchEstimatorConfigFromDB();
      if (loadedConfig) setEstimatorConfig(loadedConfig);
    }
    loadData();
  }, []);

  // Apply theme class to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('codexa_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenAddProject = () => {
    if (!isAdmin) {
      alert('Access Denied: Only authenticated Admin users can add portfolio projects.');
      setIsAuthModalOpen(true);
      return;
    }
    setIsAddModalOpen(true);
  };

  // Add Project Handler
  const handleAddProject = async (newProject) => {
    if (!isAdmin) {
      alert('Access Denied: Only authenticated Admin users can add projects.');
      return;
    }
    const updated = [newProject, ...projects];
    setProjects(updated);

    try {
      localStorage.setItem('codexa_projects_list', JSON.stringify(updated));
    } catch (err) {}

    const result = await createProject(newProject);
    if (result && !result.success) {
      alert(`Supabase DB Note: ${result.error}. Make sure you executed the updated supabase_schema.sql in your Supabase SQL Editor.`);
    }
  };

  // Delete Project Handler
  const handleDeleteProject = async (projId) => {
    if (!isAdmin) {
      alert('Access Denied: Only authenticated Admin users can delete projects.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this project from the showcase?')) {
      const updated = projects.filter(p => p.id !== projId);
      setProjects(updated);

      try {
        localStorage.setItem('codexa_projects_list', JSON.stringify(updated));
      } catch (err) {}

      const result = await deleteProjectFromDB(projId);
      if (result && !result.success) {
        alert(`Supabase DB Note: ${result.error}`);
      }
    }
  };

  // Admin Save Service Price/Details
  const handleSaveService = async (updatedService) => {
    if (!isAdmin) {
      alert('Access Denied: Admin privileges required to modify prices.');
      return;
    }
    const updated = services.map(s => s.id === updatedService.id ? updatedService : s);
    setServices(updated);

    try {
      localStorage.setItem('codexa_custom_services', JSON.stringify(updated));
    } catch (err) {}

    const result = await updateServiceInDB(updatedService);
    if (result && !result.success) {
      alert(`Supabase DB Note: ${result.error}`);
    }
  };

  // Admin Save Contact Info
  const handleSaveContact = async (updatedContact) => {
    setContactInfo(updatedContact);
    try {
      localStorage.setItem('codexa_contact_info', JSON.stringify(updatedContact));
    } catch (e) {}

    await updateContactInfoInDB(updatedContact);
  };

  // Admin Save Tech Stack Item
  const handleSaveTechItem = (newItem) => {
    const updated = [newItem, ...techItems];
    setTechItems(updated);
    try {
      localStorage.setItem('codexa_tech_items', JSON.stringify(updated));
    } catch (e) {}
  };

  // Admin Delete Tech Stack Item
  const handleDeleteTech = (techName) => {
    if (!isAdmin) return;
    if (window.confirm(`Delete ${techName} from Tech Stack?`)) {
      const updated = techItems.filter(t => t.name !== techName);
      setTechItems(updated);
      try {
        localStorage.setItem('codexa_tech_items', JSON.stringify(updated));
      } catch (e) {}
    }
  };

  // Admin Save Estimator Config Pricing Matrix
  const handleSaveEstimatorConfig = async (newConfig) => {
    setEstimatorConfig(newConfig);
    try {
      localStorage.setItem('codexa_estimator_config', JSON.stringify(newConfig));
    } catch (e) {}

    await updateEstimatorConfigInDB(newConfig);
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookEstimate = (estimateData) => {
    setPrefilledEstimate(estimateData);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currency={currency} 
        setCurrency={setCurrency}
        onOpenAddProject={handleOpenAddProject}
      />

      {/* Hero Section */}
      <Hero onOpenAddProject={handleOpenAddProject} />

      {/* Services Section */}
      <ServicesSection 
        services={services}
        currency={currency} 
        onSelectService={handleSelectService} 
        onEditService={(srv) => setEditingService(srv)}
      />

      {/* Interactive Project Estimator */}
      <ProjectEstimator 
        currency={currency} 
        estimatorConfig={estimatorConfig}
        onBookEstimate={handleBookEstimate} 
        onEditEstimatorClick={() => setIsEstimatorModalOpen(true)}
      />

      {/* Portfolio Showcase Section */}
      <PortfolioSection 
        projects={projects} 
        onOpenAddProject={handleOpenAddProject} 
        onDeleteProject={handleDeleteProject}
      />

      {/* Agile Workflow Process */}
      <ProcessSection />

      {/* Tech Stack Section */}
      <TechStackSection 
        techItems={techItems}
        onAddTechClick={() => setIsTechModalOpen(true)}
        onDeleteTech={handleDeleteTech}
      />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Contact & Consultation Booking Form */}
      <ContactSection 
        contactInfo={contactInfo}
        selectedService={selectedService} 
        prefilledEstimate={prefilledEstimate} 
        onEditContact={() => setIsContactModalOpen(true)}
      />

      {/* Footer */}
      <Footer onOpenAddProject={handleOpenAddProject} />

      {/* Interactive Live Chat Assistant */}
      <ChatWidget onOpenAddProject={handleOpenAddProject} />

      {/* Protected Admin Add Project Modal */}
      {isAdmin && (
        <AddProjectModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onAddProject={handleAddProject} 
        />
      )}

      {/* Protected Admin Edit Service Price Modal */}
      {isAdmin && editingService && (
        <EditServiceModal 
          isOpen={Boolean(editingService)} 
          service={editingService} 
          onClose={() => setEditingService(null)} 
          onSaveService={handleSaveService} 
        />
      )}

      {/* Protected Admin Edit Contact Modal */}
      {isAdmin && (
        <EditContactModal 
          isOpen={isContactModalOpen} 
          contactInfo={contactInfo} 
          onClose={() => setIsContactModalOpen(false)} 
          onSaveContact={handleSaveContact} 
        />
      )}

      {/* Protected Admin Edit Tech Item Modal */}
      {isAdmin && (
        <EditTechModal 
          isOpen={isTechModalOpen} 
          onClose={() => setIsTechModalOpen(false)} 
          onSaveTechItem={handleSaveTechItem} 
        />
      )}

      {/* Protected Admin Edit Cost Calculator Pricing Matrix Modal */}
      {isAdmin && (
        <EditEstimatorModal 
          isOpen={isEstimatorModalOpen} 
          estimatorConfig={estimatorConfig} 
          onClose={() => setIsEstimatorModalOpen(false)} 
          onSaveConfig={handleSaveEstimatorConfig} 
        />
      )}

      {/* Authentication Sign In / Register Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
