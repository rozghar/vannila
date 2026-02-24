'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { StudentProfile, TeacherProfile, DriverProfile, LocalsProfile } from '@/components/ProfileCards'
import ProfileImageUpload from '@/components/ProfileImageUpload'
import ProtectedRoute from '@/components/ProtectedRoute'
import { supabase } from '@/lib/supabaseClient'
import { fetchUserProfile, updateUserProfile, createListing } from '@/lib/database'

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: user?.email || '',
    phoneNumber: '',
    dateOfBirth: '',
    state: '',
    district: '',
    village: '',
    role: 'student',
    avatarUrl: '',
    bio: '',
  })

  useEffect(() => {
    if (user) {
      loadProfile()
    }
  }, [user])

  const loadProfile = async () => {
    setLoading(true)
    const { data, error } = await fetchUserProfile(supabase, user.id)
    if (!error && data) {
      setProfileData({
        fullName: data.full_name || '',
        email: user.email || '',
        phoneNumber: data.phone_number || '',
        dateOfBirth: data.date_of_birth || '',
        state: data.state || '',
        district: data.district || '',
        village: data.village || '',
        role: data.role || 'student',
        avatarUrl: data.avatar_url || '',
        bio: data.bio || '',
      })
    }
    setLoading(false)
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    const updateData = {
      full_name: profileData.fullName,
      phone_number: profileData.phoneNumber,
      date_of_birth: profileData.dateOfBirth,
      state: profileData.state,
      district: profileData.district,
      village: profileData.village,
      role: profileData.role,
      avatar_url: profileData.avatarUrl,
      bio: profileData.bio,
    }
    
    const error = await updateUserProfile(supabase, user.id, updateData)
    
    if (!error) {
      // Create or update listing
      await createListing(supabase, user.id, profileData)
      setIsEditing(false)
      alert('Profile saved!')
    } else {
      alert('Failed to save profile')
    }
    setLoading(false)
  }

  const handleAvatarUpload = (url) => {
    setProfileData(prev => ({ ...prev, avatarUrl: url }))
  }

  const renderRoleProfile = () => {
    switch (profileData.role) {
      case 'student':
        return <StudentProfile />
      case 'teacher':
        return <TeacherProfile />
      case 'driver':
        return <DriverProfile />
      case 'locals':
        return <LocalsProfile />
      default:
        return null
    }
  }

  if (loading && !isEditing) return <p>Loading profile...</p>

  return (
    <ProtectedRoute>
      <div className="profile-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div className="profile-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>My Profile</h1>
          <button
            onClick={() => {
              if (isEditing) handleSaveProfile()
              else setIsEditing(!isEditing)
            }}
            disabled={loading}
            style={{
              padding: '8px 16px',
              backgroundColor: isEditing ? '#28a745' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {isEditing ? (loading ? 'Saving...' : 'Save Profile') : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <div className="profile-edit" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <ProfileImageUpload userId={user.id} currentAvatarUrl={profileData.avatarUrl} onUploadComplete={handleAvatarUpload} />

            <h2>Basic Information</h2>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Full Name</label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                placeholder="Your full name"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                placeholder="Tell others about yourself"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', minHeight: '80px', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Email</label>
              <input type="email" value={profileData.email} disabled style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Phone Number</label>
              <input
                type="tel"
                value={profileData.phoneNumber}
                onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                placeholder="10-digit mobile number"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Date of Birth</label>
              <input
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>State</label>
              <select
                value={profileData.state}
                onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              >
                <option value="">Select State</option>
                <option value="westbengal">West Bengal</option>
                <option value="assam">Assam</option>
                <option value="tripura">Tripura</option>
                <option value="odisha">Odisha</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>District</label>
              <input
                type="text"
                value={profileData.district}
                onChange={(e) => setProfileData({ ...profileData, district: e.target.value })}
                placeholder="District"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Village/Town</label>
              <input
                type="text"
                value={profileData.village}
                onChange={(e) => setProfileData({ ...profileData, village: e.target.value })}
                placeholder="Village or town"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Role</label>
              <select
                value={profileData.role}
                onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher / Tutor</option>
                <option value="driver">Driver</option>
                <option value="locals">Local Service Provider</option>
              </select>
            </div>

            <h2 style={{ marginTop: '30px' }}>Role-Specific Details</h2>
            {renderRoleProfile()}
          </div>
        ) : (
          <div className="profile-view" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {profileData.avatarUrl && (
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                  src={profileData.avatarUrl}
                  alt="Avatar"
                  style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #007bff' }}
                />
              </div>
            )}

            <h2>Basic Information</h2>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '600', minWidth: '150px' }}>Full Name:</span>
              <span>{profileData.fullName || 'Not set'}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '600', minWidth: '150px' }}>Email:</span>
              <span>{profileData.email}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '600', minWidth: '150px' }}>Phone:</span>
              <span>{profileData.phoneNumber || 'Not set'}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '600', minWidth: '150px' }}>Date of Birth:</span>
              <span>{profileData.dateOfBirth || 'Not set'}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '600', minWidth: '150px' }}>Location:</span>
              <span>
                {profileData.village && profileData.district && profileData.state
                  ? `${profileData.village}, ${profileData.district}, ${profileData.state}`
                  : 'Not set'}
              </span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '600', minWidth: '150px' }}>Role:</span>
              <span>{profileData.role}</span>
            </div>
            {profileData.bio && (
              <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <span style={{ fontWeight: '600', minWidth: '150px' }}>Bio:</span>
                <span>{profileData.bio}</span>
              </div>
            )}

            <h2 style={{ marginTop: '30px' }}>Role-Specific Details</h2>
            {renderRoleProfile()}
          </div>
        )}

        <div style={{ marginTop: '20px' }}>
          <Link href="/dashboard" style={{ color: '#007bff', textDecoration: 'none' }}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  )
}

  const renderRoleProfile = () => {
    switch (profileData.role) {
      case 'student':
        return <StudentProfile />
      case 'teacher':
        return <TeacherProfile />
      case 'driver':
        return <DriverProfile />
      case 'locals':
        return <LocalsProfile />
      default:
        return null
    }
  }

  return (
    <ProtectedRoute>
      <div className="profile-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div className="profile-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {isEditing ? 'Done' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <div className="profile-edit" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Basic Information</h2>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Full Name</label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                placeholder="Your full name"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Email</label>
              <input type="email" value={profileData.email} disabled style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Phone Number</label>
              <input
                type="tel"
                value={profileData.phoneNumber}
                onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                placeholder="10-digit mobile number"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Date of Birth</label>
              <input
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>State</label>
              <select
                value={profileData.state}
                onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              >
                <option value="">Select State</option>
                <option value="westbengal">West Bengal</option>
                <option value="assam">Assam</option>
                <option value="tripura">Tripura</option>
                <option value="odisha">Odisha</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>District</label>
              <input
                type="text"
                value={profileData.district}
                onChange={(e) => setProfileData({ ...profileData, district: e.target.value })}
                placeholder="District"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Village/Town</label>
              <input
                type="text"
                value={profileData.village}
                onChange={(e) => setProfileData({ ...profileData, village: e.target.value })}
                placeholder="Village or town"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Role</label>
              <select
                value={profileData.role}
                onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher / Tutor</option>
                <option value="driver">Driver</option>
                <option value="locals">Local Service Provider</option>
              </select>
            </div>

            <h2 style={{ marginTop: '30px' }}>Role-Specific Details</h2>
            {renderRoleProfile()}
          </div>
        ) : (
          <div className="profile-view" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Basic Information</h2>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '600', minWidth: '150px' }}>Full Name:</span>
              <span>{profileData.fullName || 'Not set'}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '600', minWidth: '150px' }}>Email:</span>
              <span>{profileData.email}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '600', minWidth: '150px' }}>Phone:</span>
              <span>{profileData.phoneNumber || 'Not set'}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '600', minWidth: '150px' }}>Date of Birth:</span>
              <span>{profileData.dateOfBirth || 'Not set'}</span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '600', minWidth: '150px' }}>Location:</span>
              <span>
                {profileData.village && profileData.district && profileData.state
                  ? `${profileData.village}, ${profileData.district}, ${profileData.state}`
                  : 'Not set'}
              </span>
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ fontWeight: '600', minWidth: '150px' }}>Role:</span>
              <span>{profileData.role}</span>
            </div>

            <h2 style={{ marginTop: '30px' }}>Role-Specific Details</h2>
            {renderRoleProfile()}
          </div>
        )}

        <div style={{ marginTop: '20px' }}>
          <Link href="/dashboard" style={{ color: '#007bff', textDecoration: 'none' }}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  )
}