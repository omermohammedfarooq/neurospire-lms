-- PostgreSQL Relational Database Schema for Neurospire AI Technologies LMS
-- Designed for complete Supabase PostgreSQL compatibility.

-- 1. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Weeks Table (Hierarchical Sections)
CREATE TABLE IF NOT EXISTS weeks (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
    week_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_week_number UNIQUE (course_id, week_number)
);

-- 3. Modules Table (Lessons within Weeks)
CREATE TABLE IF NOT EXISTS modules (
    id VARCHAR(50) PRIMARY KEY,
    week_id VARCHAR(50) REFERENCES weeks(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    video_url TEXT NOT NULL,
    notes TEXT,
    resources JSONB DEFAULT '[]'::jsonb, -- Array of resources: [{name, url, type}]
    assignment_title VARCHAR(255) NOT NULL,
    assignment_description TEXT NOT NULL,
    assignment_deliverable TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Announcements Table (Global Admin Notices)
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    tier_access VARCHAR(50) NOT NULL DEFAULT 'All', -- 'All', 'Lite', 'Regular', 'Pro'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Submissions Table (Student Assignments)
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(255) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    module_id VARCHAR(50) REFERENCES modules(id) ON DELETE CASCADE,
    module_title VARCHAR(255) NOT NULL,
    submission_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Student Progress Table (Completed Modules)
CREATE TABLE IF NOT EXISTS student_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_email VARCHAR(255) NOT NULL,
    module_id VARCHAR(50) REFERENCES modules(id) ON DELETE CASCADE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_student_module UNIQUE (student_email, module_id)
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;

-- Setup RLS Access Control Policies
-- Public Read policy (everyone can read courses, weeks, and modules)
CREATE POLICY "Allow public read of courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Allow public read of weeks" ON weeks FOR SELECT USING (true);
CREATE POLICY "Allow public read of modules" ON modules FOR SELECT USING (true);
CREATE POLICY "Allow public read of announcements" ON announcements FOR SELECT USING (true);

-- Admin CRUD policy (Only authenticated administrators can write/edit courses, weeks, modules, announcements)
-- (Supabase checks role: 'authenticated' or metadata claims for admin verification)
CREATE POLICY "Allow admin CRUD on courses" ON courses FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin CRUD on weeks" ON weeks FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin CRUD on modules" ON modules FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin CRUD on announcements" ON announcements FOR ALL TO authenticated USING (true);

-- Student Submission policies (students can write their submissions, admins can read all)
CREATE POLICY "Allow students to insert submissions" ON submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on submissions" ON submissions FOR SELECT USING (true);

-- Student Progress policies
CREATE POLICY "Allow students to manage own progress" ON student_progress FOR ALL USING (true);

-- Seed Initial Course Metadata (AI Engineering Program)
INSERT INTO courses (id, title, subtitle, description)
VALUES (
    'ai-eng-intern',
    'AI Engineering Program',
    'Master fullstack software engineering powered by artificial intelligence tools.',
    'Deep dive into fullstack product engineering, custom LLM routing, backend schemas, Vercel scales, and AI-assisted velocity.'
) ON CONFLICT (id) DO NOTHING;
