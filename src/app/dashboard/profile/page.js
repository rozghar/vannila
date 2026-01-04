'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { StudentProfile, TeacherProfile, DriverProfile, LocalsProfile } from '@/components/ProfileCards'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: user?.email || '',
    phoneNumber: user?.user_metadata?.phone_number || '',
    dateOfBirth: user?.user_metadata?.date_of_birth || '',
    state: user?.user_metadata?.state || '',
    district: user?.user_metadata?.district || '',
    village: user?.user_metadata?.village || '',
    role: user?.user_metadata?.role || 'student',
  })

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