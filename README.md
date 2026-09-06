# ⚡ CODEXA — Digital Engineering & Freelance Agency Platform

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3.1-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub Repository](https://img.shields.io/badge/GitHub-asifiqubal18%2FCODEXA--freelance--platform-purple.svg?logo=github)](https://github.com/asifiqubal18/CODEXA-freelance-platform)

**CODEXA** is a state-of-the-art web application engineered for freelance agencies and software development studios. It showcases high-performance digital services—including **Web Development**, **Mobile App Development (iOS & Android)**, **UI/UX Design**, **AI Automation**, and **Cloud Architecture**—with interactive client tools and real-time project estimation.

---

## 🌟 Key Features

- **🛠️ Admin Manual Project Showcase ("+ Add Project")**:
  - Agency owners can manually add custom projects to display to prospective clients.
  - Supports custom Title, Category, Client Name, Tech Tags, Impact Metrics, Live Demo Link, Image URL / Stock Presets, and Case Summaries.
  - Saves instantly to `localStorage` so newly added projects persist across browser sessions.

- **🧮 Interactive Project Cost & Duration Estimator**:
  - 4-step real-time calculator for clients to estimate project pricing and delivery duration based on platform choice, UI/UX complexity, feature add-ons, and delivery urgency.

- **🌐 Multi-Currency Converter**:
  - Real-time price conversion between **$ USD**, **€ EUR**, **£ GBP**, and **₹ INR** across all service rates and calculator totals.

- **🌓 Glassmorphic Dark / Light Mode**:
  - Sleek dark space theme (`#080c14`) and clean light mode (`#f8fafc`) powered by customizable CSS variables.

- **🤖 Interactive Live Chat Assistant**:
  - Bottom-right floating AI chat widget offering quick FAQ answers and guidance on project bookings.

- **📋 Dynamic Consultation Booking & Lead Intake**:
  - Form pre-fills automatically when selecting specific services or estimator results, allowing seamless lead capture.

---

## 🔄 Whole Workflow of the Project

The application is structured into two primary workflows: **Client / Prospect Flow** and **Admin / Agency Owner Flow**.

```mermaid
flowchart TD
    subgraph Client Flow
        A[Visit CODEXA Website] --> B[Browse Core Services]
        B --> C[Use Project Cost Estimator]
        C --> D[Explore Portfolio Case Studies]
        D --> E[Submit Consultation Form]
        A --> F[Interact with AI Chat Widget]
    end

    subgraph Admin Flow
        G[Click "+ Add Project" Button] --> H[Open Project Creation Modal]
        H --> I[Input Project Metadata & Image]
        I --> J[Save & Publish]
        J --> K[Update Portfolio Gallery & LocalStorage]
    end

    K --> D
    C --> E
```

### 1. Client & Prospect Workflow
1. **Hero & Agency Overview**: Clients arrive at the hero section featuring animated stats (*150+ Apps Delivered, 99.8% Retention Rate*) and live availability status (*🟢 Accepting Q3/Q4 Projects*).
2. **Service Selection**: Prospects browse categorized service cards (Web, Mobile App, UI/UX, AI, Cloud), view feature checklists, and check starting prices in their local currency.
3. **Interactive Project Estimation**: Clients customize product type, UI design level, add-on modules (Stripe, Auth, OpenAI, Admin Dashboard), and urgency to calculate instant cost and time ranges.
4. **Portfolio Case Study Review**: Filter projects by category, view real-world metrics (*e.g., +280% Active Users*), and open deep-dive case study detail popups.
5. **Consultation & Booking Intake**: Pre-filled estimates transfer directly to the contact form for fast lead submission.

### 2. Admin & Agency Owner Workflow
1. **Triggering Admin Portal**: Click the **"+ Add Project"** button in the top navigation bar or the portfolio section.
2. **Project Registration**: Fill out the modal dialog form:
   - **Title**: *e.g., NovaPay Merchant Gateway*
   - **Category**: *Web Development, Mobile App, UI/UX, AI, Cloud*
   - **Client**: *e.g., Nova Payments Ltd.*
   - **Tech Stack**: *e.g., React, Next.js, Node.js, Stripe*
   - **Impact Metric**: *e.g., +450% Speed Boost*
   - **Image Selection**: Enter custom URL or choose from quick high-res image presets.
   - **Live Link & Summary**: Add project URL and case details.
3. **Instant Publishing**: Clicking **"Save & Publish"** instantly appends the project to the live portfolio grid and saves it to `localStorage`.

---

## 🛠️ Tech Stack & Directory Structure

- **Framework**: React 18 & Vite 5
- **Icons**: Lucide React (`lucide-react`)
- **Styling**: Modern Vanilla CSS with CSS Variables, CSS Modules, Glassmorphism, and Animations

```
AAA_tech_solution/
├── index.html                  # HTML entry point with Google Fonts
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite bundler config
└── src/
    ├── main.jsx                # React root render
    ├── App.jsx                 # Main state coordinator & section assembly
    ├── index.css               # Global resets, glassmorphism, buttons, animations
    ├── styles/                 # Modular component stylesheets
    │   ├── theme.css           # Color tokens, HSL colors & dark/light theme variables
    │   ├── Navbar.css
    │   ├── Hero.css
    │   ├── Services.css
    │   ├── Estimator.css
    │   ├── Portfolio.css
    │   ├── AdminModal.css      # Admin project creation modal styling
    │   ├── Process.css
    │   ├── Testimonials.css
    │   ├── Contact.css
    │   ├── ChatWidget.css
    │   └── Footer.css
    ├── components/             # UI Components
    │   ├── Navbar.jsx          # Header navigation, theme/currency switcher, admin CTA
    │   ├── Hero.jsx            # Hero banner, stats counter, float pills
    │   ├── ServicesSection.jsx # Categorized services & rates
    │   ├── ProjectEstimator.jsx# Multi-step price & duration calculator
    │   ├── PortfolioSection.jsx# Filterable project gallery
    │   ├── AddProjectModal.jsx # Admin project manager dialog
    │   ├── ProjectModal.jsx    # Case study detail modal
    │   ├── ProcessSection.jsx  # 4-step development methodology
    │   ├── TechStackSection.jsx# Technology matrix
    │   ├── TestimonialsSection.jsx # Client reviews & ratings
    │   ├── ContactSection.jsx  # Lead capture form with budget range selector
    │   ├── ChatWidget.jsx      # Interactive live chat assistant
    │   └── Footer.jsx          # Brand links, newsletter, live status
    └── data/                   # Data Stores
        ├── servicesData.js     # Core service offerings
        ├── portfolioData.js    # Pre-populated showcase projects
        └── FAQsData.js          # Frequently asked questions
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (`v18.0.0` or higher)
- `npm` (v9.0.0 or higher)

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/asifiqubal18/CODEXA-freelance-platform.git
   cd CODEXA-freelance-platform
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Launch Local Dev Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000/](http://localhost:3000/) in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📄 License

This project is open-source under the **MIT License**.
