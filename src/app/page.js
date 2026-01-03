'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <main style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h1>My Regional Platform</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
        Connect Teachers, Drivers, and Students in West Bengal & Assam
      </p>

      {!user ? (
        <div>
          <p>Get started by signing up or logging in:</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <Link href="/auth/register">
              <button style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}>
                Register
              </button>
            </Link>
            <Link href="/auth/login">
              <button style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}>
                Login
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p>Welcome, {user.email}!</p>
          <Link href="/dashboard">
            <button style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}>
              Go to Dashboard
            </button>
          </Link>
        </div>
      )}
    </main>
  )
}