"use client"

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { states, getDistricts, getVillages } from '@/data/statesDistricts'

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
    district: '',
    village: '',
    dateOfBirth: '',
    phoneNumber: '',
  })

  const districts = useMemo(() => getDistricts(formData.state), [formData.state])
  const villages = useMemo(() => getVillages(formData.state, formData.district), [formData.state, formData.district])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Reset district and village when state changes
    if (name === 'state') {
      setFormData(prev => ({
        ...prev,
        district: '',
        village: '',
      }))
    }
    // Reset village when district changes
    if (name === 'district') {
      setFormData(prev => ({
        ...prev,
        village: '',
      }))
    }
  }

  const validatePhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.phoneNumber) {
      setError('Phone number is required')
      return
    }

    if (!validatePhone(formData.phoneNumber)) {
      setError('Phone number must be a valid 10-digit Indian number (starts with 6-9)')
      return
    }

    if (!formData.dateOfBirth) {
      setError('Date of birth is required')
      return
    }

    if (!formData.district || !formData.village) {
      setError('Please select state, district, and village/town')
      return
    }

    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const { error: signUpError, data } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
        },
        {
          data: {
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            date_of_birth: formData.dateOfBirth,
            state: formData.state,
            district: formData.district,
            village: formData.village,
            role: formData.role,
          },
        }
      )

      if (signUpError) {
        setError(signUpError.message)
      } else if (data?.user) {
        // Save profile to database
        try {
          await supabase.from('profiles').insert({
            id: data.user.id,
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            date_of_birth: formData.dateOfBirth,
            state: formData.state,
            district: formData.district,
            village: formData.village,
            role: formData.role,
          })
        } catch (profileErr) {
          console.warn('Profile save warning:', profileErr)
          // Continue even if profile save fails
        }
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
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="10-digit Indian number (e.g., 9876543210)"
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          >
            {states.map(s => (
              <option key={s.code} value={s.code}>{s.name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="district">District</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          >
            <option value="">Select District</option>
            {districts.map(d => (
              <option key={d.code} value={d.code}>{d.name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="village">Village/Town</label>
          <select
            id="village"
            name="village"
            value={formData.village}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          >
            <option value="">Select Village/Town</option>
            {villages.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
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
            <option value="locals">Local Service Provider</option>
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
