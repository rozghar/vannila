'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function Register() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    state: 'westbengal',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const { error: signUpError } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
        },
        {
          data: {
            full_name: formData.fullName,
            role: formData.role,
            state: formData.state,
          },
        }
      )

      if (signUpError) {
        setError(signUpError.message)
      } else {
        router.push('/auth/login')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ color: '#333' }}>Register</h1>

      {error && (
        <div style={{ color: 'red', marginBottom: '10px', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password (min 6 chars)</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="role">I am a:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher / Tutor</option>
            <option value="driver">Driver</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="state">State:</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          >
            <option value="westbengal">West Bengal</option>
            <option value="assam">Assam</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
          }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Already have an account?{' '}
        <a href="/auth/login" style={{ color: '#007bff', textDecoration: 'none' }}>
          Log in
        </a>
      </p>
    </div>
  )
}