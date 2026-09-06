-- CODEXA Supabase Database Schema (Updated RLS Policies for Admin & Public Access)

-- 1. Create Profiles Table for User Roles (Admin vs Client)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all profile inserts" ON public.profiles;
CREATE POLICY "Allow all profile inserts" ON public.profiles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (true);

-- Trigger to automatically create profile on signup
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

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 2. Create Projects Table for Client Portfolio Showcase
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

-- Enable RLS on Projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Projects are viewable by everyone" ON public.projects;
CREATE POLICY "Projects are viewable by everyone" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow project inserts" ON public.projects;
CREATE POLICY "Allow project inserts" ON public.projects FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow project deletes" ON public.projects;
CREATE POLICY "Allow project deletes" ON public.projects FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow project updates" ON public.projects;
CREATE POLICY "Allow project updates" ON public.projects FOR UPDATE USING (true);


-- 3. Create Services Table for Agency Offerings & Pricing
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

-- Enable RLS on Services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Services are viewable by everyone" ON public.services;
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow service inserts" ON public.services;
CREATE POLICY "Allow service inserts" ON public.services FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service updates" ON public.services;
CREATE POLICY "Allow service updates" ON public.services FOR UPDATE USING (true);
