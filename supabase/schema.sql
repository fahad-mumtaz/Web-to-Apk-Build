-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'business')),
  builds_used_today INTEGER DEFAULT 0,
  last_build_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create builds table
CREATE TABLE IF NOT EXISTS builds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  input_type TEXT NOT NULL CHECK (input_type IN ('url', 'github', 'zip')),
  input_value TEXT NOT NULL,
  zip_file_url TEXT,
  app_name TEXT NOT NULL,
  package_name TEXT NOT NULL,
  version TEXT DEFAULT '1.0.0',
  icon_url TEXT,
  splash_url TEXT,
  permissions JSONB DEFAULT '{}',
  status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'building', 'success', 'failed')),
  logs TEXT DEFAULT '',
  apk_url TEXT,
  aab_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_builds_user_id ON builds(user_id);
CREATE INDEX IF NOT EXISTS idx_builds_created_at ON builds(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_builds_status ON builds(status);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
('uploads', 'uploads', false),
('builds', 'builds', false)
ON CONFLICT (id) DO NOTHING;

-- Set up Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE builds ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Builds policies
CREATE POLICY "Users can view own builds" ON builds
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own builds" ON builds
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own builds" ON builds
  FOR UPDATE USING (auth.uid() = user_id);

-- Storage policies
CREATE POLICY "Users can upload to uploads bucket" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own uploads" ON storage.objects
  FOR SELECT USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own uploads" ON storage.objects
  FOR UPDATE USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own uploads" ON storage.objects
  FOR DELETE USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to reset daily build count
CREATE OR REPLACE FUNCTION reset_daily_build_counts()
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET builds_used_today = 0, last_build_date = CURRENT_DATE
  WHERE last_build_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Create a function to increment build count
CREATE OR REPLACE FUNCTION increment_build_count(user_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET builds_used_today = builds_used_today + 1,
      last_build_date = CURRENT_DATE
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql;
