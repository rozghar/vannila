'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { fetchListings } from '@/lib/database'
import { states, getDistricts } from '@/data/statesDistricts'
import ListingCard from '@/components/ListingCard'

export default function SearchListings() {
  const [filters, setFilters] = useState({
    state: 'westbengal',
    district: '',
    role: '',
    searchTerm: '',
  })
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)

  const districts = getDistricts(filters.state)

  useEffect(() => {
    searchListings()
  }, [])

  const searchListings = async () => {
    setLoading(true)
    const { data, error } = await fetchListings(supabase, filters)
    if (!error) {
      setListings(data || [])
    }
    setLoading(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    searchListings()
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value,
      // Reset district if state changes
      ...(name === 'state' && { district: '' })
    }))
  }

  return (
    <div className="search-page" style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
      <h1>Find Teachers, Drivers & Services</h1>

      <form onSubmit={handleSearch} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Search</label>
            <input
              type="text"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              placeholder="Search by name or keyword"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>State</label>
            <select
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            >
              {states.map(s => (
                <option key={s.code} value={s.code}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>District</label>
            <select
              name="district"
              value={filters.district}
              onChange={handleFilterChange}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            >
              <option value="">All Districts</option>
              {districts.map(d => (
                <option key={d.code} value={d.code}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Role/Service Type</label>
            <select
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            >
              <option value="">All Roles</option>
              <option value="teacher">Teachers & Tutors</option>
              <option value="driver">Drivers</option>
              <option value="locals">Local Services</option>
              <option value="student">Students</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading listings...</p>
      ) : (
        <>
          <h2>Results ({listings.length})</h2>
          {listings.length === 0 ? (
            <p style={{ color: '#666' }}>No listings found. Try adjusting your filters.</p>
          ) : (
            <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
              {listings.map(item => (
                <ListingCard
                  key={item.id}
                  title={item.title}
                  location={`${item.village}, ${item.district}`}
                  rating={item.rating || 0}
                  role={item.role}
                  image="https://placehold.co/600x400?text=Provider"
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
