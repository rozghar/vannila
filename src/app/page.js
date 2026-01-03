'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <main style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ color: '#333', fontSize: '2.5rem', marginBottom: '20px' }}>Welcome to My Regional Platform</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
        Empowering Teachers, Drivers, and Students in India
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
        <p>Welcome back, {user.email}!</p>
      )}
    </main>
  )
}