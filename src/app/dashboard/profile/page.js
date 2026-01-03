'use client'

import { useAuth } from '@/context/AuthContext'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function Profile() {
  const { user } = useAuth()
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      // Get user metadata to determine role
      const role = user.user_metadata?.role || 'student'
      setUserRole(role)
      setLoading(false)
    }
  }, [user])

  if (loading) return <p>Loading...</p>

  return (
    <ProtectedRoute>
      <div style={{ padding: '20px', maxWidth: '600px' }}>
        <h1>My Profile</h1>
        <p>Role: <strong>{userRole}</strong></p>
        <p>Email: <strong>{user?.email}</strong></p>

        {userRole === 'student' && <StudentProfileForm />}
        {userRole === 'teacher' && <TeacherProfileForm />}
        {userRole === 'driver' && <DriverProfileForm />}

        <div style={{ marginTop: '20px' }}>
          <a href="/dashboard" style={{ color: '#007bff', textDecoration: 'none' }}>
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function StudentProfileForm() {
  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <h3>Student Profile</h3>
      <p>Here you can:</p>
      <ul>
        <li>Search for teachers and drivers</li>
        <li>View profiles and ratings</li>
        <li>Leave reviews</li>
        <li>Contact providers</li>
      </ul>
      {/* Form fields will go here in Sprint 2 */}
    </div>
  )
}

function TeacherProfileForm() {
  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <h3>Teacher Profile</h3>
      <p>Tell students about yourself:</p>
      <ul>
        <li>Subjects you teach</li>
        <li>Years of experience</li>
        <li>Hourly rate</li>
        <li>City / location</li>
        <li>Availability</li>
      </ul>
      {/* Form fields will go here in Sprint 2 */}
    </div>
  )
}

function DriverProfileForm() {
  return (
    <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <h3>Driver Profile</h3>
      <p>Tell customers about yourself:</p>
      <ul>
        <li>License number</li>
        <li>Vehicle type</li>
        <li>City / service area</li>
        <li>Experience</li>
        <li>Contact info</li>
      </ul>
      {/* Form fields will go here in Sprint 2 */}
    </div>
  )
}