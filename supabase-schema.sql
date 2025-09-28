-- InternLink Database Schema for Supabase
-- Run these commands in your Supabase SQL Editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'mentor', 'recruiter', 'placement_cell', 'admin')),
    student_id VARCHAR(50),
    department VARCHAR(100),
    year_of_study VARCHAR(20),
    company VARCHAR(100),
    job_title VARCHAR(100),
    specialization VARCHAR(100),
    experience VARCHAR(50),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Opportunities Table
CREATE TABLE IF NOT EXISTS opportunities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('internship', 'job', 'training')),
    location VARCHAR(255),
    requirements TEXT[],
    salary_range VARCHAR(100),
    application_deadline TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES users(id),
    opportunity_id UUID REFERENCES opportunities(id),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'interview', 'hired')),
    cover_letter TEXT,
    resume_url TEXT,
    mentor_approval BOOLEAN DEFAULT false,
    mentor_id UUID REFERENCES users(id),
    mentor_comments TEXT,
    recruiter_feedback TEXT,
    interview_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES users(id),
    application_id UUID REFERENCES applications(id),
    certificate_type VARCHAR(100) NOT NULL,
    certificate_url TEXT,
    supervisor_feedback TEXT,
    completion_date TIMESTAMP WITH TIME ZONE,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_applications_student_id ON applications(student_id);
CREATE INDEX IF NOT EXISTS idx_applications_opportunity_id ON applications(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_opportunities_type ON opportunities(type);
CREATE INDEX IF NOT EXISTS idx_opportunities_is_active ON opportunities(is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create Row Level Security Policies
-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Students can view opportunities
CREATE POLICY "Students can view opportunities" ON opportunities
    FOR SELECT USING (is_active = true);

-- Recruiters can manage their opportunities
CREATE POLICY "Recruiters can manage opportunities" ON opportunities
    FOR ALL USING (created_by = auth.uid());

-- Students can manage their applications
CREATE POLICY "Students can manage applications" ON applications
    FOR ALL USING (student_id = auth.uid());

-- Mentors can view applications of their students
CREATE POLICY "Mentors can view student applications" ON applications
    FOR SELECT USING (mentor_id = auth.uid());

-- Create trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON opportunities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO users (email, full_name, role, department) VALUES 
('student@demo.com', 'John Doe', 'student', 'Computer Science'),
('mentor@demo.com', 'Dr. Sarah Smith', 'mentor', 'Computer Science'),
('recruiter@demo.com', 'Jane Wilson', 'recruiter', NULL),
('admin@demo.com', 'System Admin', 'admin', 'IT Department'),
('placement@demo.com', 'Placement Officer', 'placement_cell', 'Placement Cell')
ON CONFLICT (email) DO NOTHING;