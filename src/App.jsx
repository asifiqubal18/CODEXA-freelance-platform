import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import ProjectEstimator from './components/ProjectEstimator';
import PortfolioSection from './components/PortfolioSection';
import AddProjectModal from './components/AddProjectModal';
import ProcessSection from './components/ProcessSection';
import TechStackSection from './components/TechStackSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';

import { initialPortfolioData } from './data/portfolioData';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('codexa_theme') || 'dark';
  });

  // Currency State
  const [currency, setCurrency] = useState('USD');

  // Add Project Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Portfolio State (Initial + localStorage)
  const [projects, setProjects] = useState(() => {
    try {
      const savedCustom = localStorage.getItem('codexa_custom_projects');
      if (savedCustom) {
        const parsedCustom = JSON.parse(savedCustom);
        return [...parsedCustom, ...initialPortfolioData];
      }
    } catch (err) {
      console.error('Error loading custom projects:', err);
    }
    return initialPortfolioData;
  });

  // Contact Form Prefills
  const [selectedService, setSelectedService] = useState(null);
  const [prefilledEstimate, setPrefilledEstimate] = useState(null);

  // Apply theme class to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('codexa_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Add Project Handler
  const handleAddProject = (newProject) => {
    const updated = [newProject, ...projects];
    setProjects(updated);

    // Save custom projects to localStorage
    try {
      const customOnly = updated.filter(p => p.isCustomAdded);
      localStorage.setItem('codexa_custom_projects', JSON.stringify(customOnly));
    } catch (err) {
      console.error('Error saving custom project:', err);
    }
  };

  // Delete Custom Project Handler
  const handleDeleteProject = (projId) => {
    if (window.confirm('Are you sure you want to remove this project from the showcase?')) {
      const updated = projects.filter(p => p.id !== projId);
      setProjects(updated);

      try {
        const customOnly = updated.filter(p => p.isCustomAdded);
        localStorage.setItem('codexa_custom_projects', JSON.stringify(customOnly));
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
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
        onOpenAddProject={() => setIsAddModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero onOpenAddProject={() => setIsAddModalOpen(true)} />

      {/* Services Section */}
      <ServicesSection 
        currency={currency} 
        onSelectService={handleSelectService} 
      />

      {/* Interactive Project Estimator */}
      <ProjectEstimator 
        currency={currency} 
        onBookEstimate={handleBookEstimate} 
      />

      {/* Portfolio Showcase Section */}
      <PortfolioSection 
        projects={projects} 
        onOpenAddProject={() => setIsAddModalOpen(true)} 
        onDeleteProject={handleDeleteProject}
      />

      {/* Agile Workflow Process */}
      <ProcessSection />

      {/* Tech Stack */}
      <TechStackSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Contact & Consultation Booking Form */}
      <ContactSection 
        selectedService={selectedService} 
        prefilledEstimate={prefilledEstimate} 
      />

      {/* Footer */}
      <Footer onOpenAddProject={() => setIsAddModalOpen(true)} />

      {/* Interactive Live Chat Assistant */}
      <ChatWidget onOpenAddProject={() => setIsAddModalOpen(true)} />

      {/* Admin Add Project Modal */}
      <AddProjectModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddProject={handleAddProject} 
      />
    </div>
  );
}
