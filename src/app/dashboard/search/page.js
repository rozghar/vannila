'use client'

import ProtectedRoute from '@/components/ProtectedRoute'

export default function Search() {
  return (
    <ProtectedRoute>
      <div style={{ padding: '20px', maxWidth: '800px' }}>
        <h1>Search Teachers & Drivers</h1>

        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <h3>Filters</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
            <div>
              <label htmlFor="role">Type:</label>
              <select id="role" style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
                <option>All</option>
                <option>Teacher</option>
                <option>Driver</option>
              </select>
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <input type="text" id="city" placeholder="e.g., Kolkata" style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button style={{ marginTop: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Search
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Results</h3>
          <p style={{ color: '#666' }}>No results yet. Use the filters above to search.</p>
        </div>

        <div style={{ marginTop: '20px' }}>
          <a href="/dashboard" style={{ color: '#007bff', textDecoration: 'none' }}>
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </ProtectedRoute>
  )
}