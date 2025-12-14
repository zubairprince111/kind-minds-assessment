-- Create table for anonymous assessment submissions
CREATE TABLE public.assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  score INTEGER NOT NULL,
  category TEXT NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for public submissions)
CREATE POLICY "Anyone can submit assessments" 
ON public.assessments 
FOR INSERT 
WITH CHECK (true);

-- Create policy to prevent reading individual records (privacy)
-- Only aggregate data access would be through admin or edge functions if needed
CREATE POLICY "No one can read individual assessments" 
ON public.assessments 
FOR SELECT 
USING (false);
