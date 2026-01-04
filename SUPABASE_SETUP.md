# Supabase Setup Guide

This project uses Supabase for authentication, database, and file storage. Follow these steps to set up your database schema and storage buckets.

## 1. Create Database Tables

Go to your Supabase dashboard → SQL Editor and run the following queries:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone_number TEXT,
  date_of_birth DATE,
  state TEXT,
  district TEXT,
  village TEXT,
  role TEXT DEFAULT 'student',
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create listings table
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  role TEXT,
  state TEXT,
  district TEXT,
  village TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create ratings table
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for search
CREATE INDEX idx_listings_state ON listings(state);
CREATE INDEX idx_listings_district ON listings(district);
CREATE INDEX idx_listings_role ON listings(role);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_ratings_listing ON ratings(listing_id);
```

## 2. Create Storage Bucket for Avatars

1. Go to Supabase Dashboard → Storage
2. Click "New Bucket"
3. Name it: `avatars`
4. Make it **Public** so avatars can be viewed without auth
5. Click "Create bucket"

## 3. Update RLS Policies (Row Level Security)

Go to Authentication → Policies and ensure:

**profiles table:**
- SELECT: Anyone can view
- INSERT: Users can insert their own profile
- UPDATE: Users can update their own profile

**listings table:**
- SELECT: Anyone can view
- INSERT: Users can insert listings
- UPDATE: Users can update their own listings

**ratings table:**
- SELECT: Anyone can view
- INSERT: Authenticated users can submit ratings
- UPDATE: Only submitter can edit

**avatars storage:**
- SELECT: Public access
- INSERT: Authenticated users
- UPDATE: Only owner

## 4. Environment Variables

Make sure your `.env.local` has:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Testing

1. Register a new user
2. Go to `/dashboard/profile` and upload an avatar
3. Update your profile details
4. Go to `/search` to view all listings
5. Click on a listing and submit a review with rating

## Features Enabled

✅ User profiles with avatar uploads  
✅ Profile data persistence in Supabase  
✅ Search and filter listings by state, district, role  
✅ Rating and review system  
✅ Location-based search (cascading dropdowns)  
✅ Role-specific profile fields  
