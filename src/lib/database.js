// Database setup instructions and queries for Supabase

export const dbSetupQueries = `
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
`;

export const initializeProfile = async (supabase, userId, profileData) => {
  const { error } = await supabase.from('profiles').insert({
    id: userId,
    full_name: profileData.fullName,
    phone_number: profileData.phoneNumber,
    date_of_birth: profileData.dateOfBirth,
    state: profileData.state,
    district: profileData.district,
    village: profileData.village,
    role: profileData.role,
  });
  return error;
};

export const fetchUserProfile = async (supabase, userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateUserProfile = async (supabase, userId, profileData) => {
  const { error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId);
  return error;
};

export const fetchListings = async (supabase, filters = {}) => {
  let query = supabase.from('listings').select('*');
  
  if (filters.state) query = query.eq('state', filters.state);
  if (filters.district) query = query.eq('district', filters.district);
  if (filters.role) query = query.eq('role', filters.role);
  if (filters.searchTerm) query = query.ilike('title', `%${filters.searchTerm}%`);
  
  const { data, error } = await query;
  return { data, error };
};

export const createListing = async (supabase, userId, listingData) => {
  const { error } = await supabase.from('listings').insert({
    user_id: userId,
    title: listingData.title || listingData.fullName,
    description: listingData.bio || '',
    role: listingData.role,
    state: listingData.state,
    district: listingData.district,
    village: listingData.village,
  });
  return error;
};

export const fetchRatings = async (supabase, listingId) => {
  const { data, error } = await supabase
    .from('ratings')
    .select('*')
    .eq('listing_id', listingId)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const submitRating = async (supabase, listingId, reviewerId, rating, reviewText) => {
  const { error } = await supabase.from('ratings').insert({
    listing_id: listingId,
    reviewer_id: reviewerId,
    rating,
    review_text: reviewText,
  });
  return error;
};

export const uploadAvatar = async (supabase, userId, file) => {
  const filename = `${userId}-${Date.now()}.jpg`;
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filename, file, { upsert: false });
  
  if (uploadError) return { error: uploadError };
  
  const { data } = supabase.storage.from('avatars').getPublicUrl(filename);
  return { url: data.publicUrl };
};
