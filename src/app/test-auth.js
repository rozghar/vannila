'use client'

import { useAuth } from '@/context/AuthContext'

export default function TestAuth() {
  const { user, loading } = useAuth()

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Auth Test</h1>
      {user ? (
        <p>Logged in as: {user.email}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  )
}