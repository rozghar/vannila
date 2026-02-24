'use client'

import { useAuth } from '@/context/AuthContext'

export default function TestAuth() {
  const { user, loading } = useAuth()

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ color: '#333' }}>Auth Test</h1>
      {user ? (
        <p>Logged in as: <strong>{user.email}</strong></p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  )
}