# Supabase Setup Guide

## Environment Variables Setup

1. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```

2. Update your `.env` file with your actual Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

## Database Schema Setup

1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL commands to create all necessary tables and policies

## Testing the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. In development mode, you'll see a "Test DB" button in the header
3. Click it to test your Supabase connection

## Authentication Flow

The app uses a hybrid authentication approach:
- **Primary**: Supabase authentication with database users
- **Fallback**: Demo authentication for testing (when Supabase is not available)

## Database Tables

- **users**: User profiles and role-based information
- **opportunities**: Job/internship postings
- **applications**: Student applications to opportunities
- **certificates**: Generated completion certificates
- **analytics**: User interaction tracking

## Security Features

- Row Level Security (RLS) enabled on all tables
- Environment variables for sensitive data
- Role-based access control
- Automatic data validation

## Development vs Production

- Development: Shows database test button and detailed error messages
- Production: Hides debug features and uses production environment variables