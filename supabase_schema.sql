-- ========================================================
-- CODEXA Complete Database Schema for Supabase / PostgreSQL
-- ========================================================

-- --------------------------------------------------------
-- 1. PROFILES TABLE (User Roles & Accounts)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public profiles view" ON public.profiles;
CREATE POLICY "Public profiles view" ON public.profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public profiles insert" ON public.profiles;
CREATE POLICY "Public profiles insert" ON public.profiles FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public profiles update" ON public.profiles;
CREATE POLICY "Public profiles update" ON public.profiles FOR UPDATE USING (true);

-- Automatic Profile Creation Trigger on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role, avatar)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'role', 'client'),
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- --------------------------------------------------------
-- 2. PROJECTS TABLE (Client Portfolio Showcase)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  client TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  metrics TEXT,
  live_url TEXT,
  featured BOOLEAN DEFAULT false,
  is_custom_added BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Projects view" ON public.projects;
CREATE POLICY "Projects view" ON public.projects FOR SELECT USING (true);
DROP POLICY IF EXISTS "Projects insert" ON public.projects;
CREATE POLICY "Projects insert" ON public.projects FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Projects delete" ON public.projects;
CREATE POLICY "Projects delete" ON public.projects FOR DELETE USING (true);
DROP POLICY IF EXISTS "Projects update" ON public.projects;
CREATE POLICY "Projects update" ON public.projects FOR UPDATE USING (true);


-- --------------------------------------------------------
-- 3. SERVICES TABLE (Agency Offerings & Pricing)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  short_desc TEXT NOT NULL,
  base_price_usd NUMERIC NOT NULL,
  timeline TEXT NOT NULL,
  popular BOOLEAN DEFAULT false,
  tech_stack TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  detailed_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Services view" ON public.services;
CREATE POLICY "Services view" ON public.services FOR SELECT USING (true);
DROP POLICY IF EXISTS "Services insert" ON public.services;
CREATE POLICY "Services insert" ON public.services FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Services update" ON public.services;
CREATE POLICY "Services update" ON public.services FOR UPDATE USING (true);


-- --------------------------------------------------------
-- 4. CONTACT INFO TABLE (Studio Details)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_info (
  id TEXT PRIMARY KEY DEFAULT 'main',
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  guarantee TEXT NOT NULL,
  availability TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Contact info view" ON public.contact_info;
CREATE POLICY "Contact info view" ON public.contact_info FOR SELECT USING (true);
DROP POLICY IF EXISTS "Contact info insert" ON public.contact_info;
CREATE POLICY "Contact info insert" ON public.contact_info FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Contact info update" ON public.contact_info;
CREATE POLICY "Contact info update" ON public.contact_info FOR UPDATE USING (true);


-- --------------------------------------------------------
-- 5. TECH STACK TABLE (Technology Matrix)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tech_stack (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  cat TEXT NOT NULL,
  level TEXT DEFAULT 'Expert',
  desc_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.tech_stack ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Tech stack view" ON public.tech_stack;
CREATE POLICY "Tech stack view" ON public.tech_stack FOR SELECT USING (true);
DROP POLICY IF EXISTS "Tech stack insert" ON public.tech_stack;
CREATE POLICY "Tech stack insert" ON public.tech_stack FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Tech stack delete" ON public.tech_stack;
CREATE POLICY "Tech stack delete" ON public.tech_stack FOR DELETE USING (true);
DROP POLICY IF EXISTS "Tech stack update" ON public.tech_stack;
CREATE POLICY "Tech stack update" ON public.tech_stack FOR UPDATE USING (true);


-- --------------------------------------------------------
-- 6. ESTIMATOR CONFIG TABLE (Cost Calculator Pricing Matrix)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.estimator_config (
  id TEXT PRIMARY KEY DEFAULT 'default',
  web_app_price NUMERIC DEFAULT 2400,
  mobile_app_price NUMERIC DEFAULT 3200,
  ecommerce_price NUMERIC DEFAULT 2800,
  ai_automation_price NUMERIC DEFAULT 3000,
  full_platform_price NUMERIC DEFAULT 5500,
  auth_price NUMERIC DEFAULT 400,
  payments_price NUMERIC DEFAULT 500,
  admin_price NUMERIC DEFAULT 650,
  ai_feature_price NUMERIC DEFAULT 800,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.estimator_config ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Estimator config view" ON public.estimator_config;
CREATE POLICY "Estimator config view" ON public.estimator_config FOR SELECT USING (true);
DROP POLICY IF EXISTS "Estimator config insert" ON public.estimator_config;
CREATE POLICY "Estimator config insert" ON public.estimator_config FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Estimator config update" ON public.estimator_config;
CREATE POLICY "Estimator config update" ON public.estimator_config FOR UPDATE USING (true);


-- --------------------------------------------------------
-- 7. INQUIRIES TABLE (Client Lead Submissions)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service_type TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Inquiries insert" ON public.inquiries;
CREATE POLICY "Inquiries insert" ON public.inquiries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Inquiries view" ON public.inquiries;
CREATE POLICY "Inquiries view" ON public.inquiries FOR SELECT USING (true);
