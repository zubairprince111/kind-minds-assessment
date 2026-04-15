
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Only admins can view roles
CREATE POLICY "Admins can view roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Security definer function to get aggregate assessment stats (bypasses RLS)
CREATE OR REPLACE FUNCTION public.get_assessment_stats()
RETURNS JSON
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_count', (SELECT COUNT(*) FROM public.assessments),
    'avg_score', (SELECT ROUND(AVG(score)::numeric, 1) FROM public.assessments),
    'category_counts', (
      SELECT COALESCE(json_object_agg(category, cnt), '{}')
      FROM (SELECT category, COUNT(*) as cnt FROM public.assessments GROUP BY category) sub
    ),
    'daily_counts', (
      SELECT COALESCE(json_agg(json_build_object('date', d, 'count', cnt) ORDER BY d), '[]')
      FROM (
        SELECT DATE(created_at) as d, COUNT(*) as cnt
        FROM public.assessments
        GROUP BY DATE(created_at)
        ORDER BY d DESC
        LIMIT 30
      ) sub
    ),
    'score_distribution', (
      SELECT COALESCE(json_agg(json_build_object('range', range, 'count', cnt) ORDER BY range), '[]')
      FROM (
        SELECT 
          CASE 
            WHEN score < 25 THEN '0-24 (Normal)'
            WHEN score < 35 THEN '25-34 (Mild)'
            WHEN score < 44 THEN '35-43 (Moderate)'
            WHEN score < 51 THEN '44-50 (Severe)'
            ELSE '51+ (Profound)'
          END as range,
          COUNT(*) as cnt
        FROM public.assessments
        GROUP BY range
      ) sub
    )
  ) INTO result;
  RETURN result;
END;
$$;
