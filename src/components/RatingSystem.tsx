import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { fetchRatings, submitRating } from '@/lib/database'
import { useAuth } from '@/context/AuthContext'

export function RatingDisplay({ listingId }) {
  const [ratings, setRatings] = useState([])
  const [avgRating, setAvgRating] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRatings()
  }, [listingId])

  const loadRatings = async () => {
    setLoading(true)
    const { data, error } = await fetchRatings(supabase, listingId)
    if (!error && data) {
      setRatings(data)
      const avg = data.length > 0 ? (data.reduce((sum, r) => sum + r.rating, 0) / data.length) : 0
      setAvgRating(avg)
    }
    setLoading(false)
  }

  const renderStars = (rating) => {
    return (
      <span style={{ color: '#f59e0b' }}>
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
      </span>
    )
  }

  return (
    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
      <h3>Ratings & Reviews ({ratings.length})</h3>
      {loading ? (
        <p>Loading ratings...</p>
      ) : (
        <>
          <div style={{ marginBottom: '15px' }}>
            <strong>Average Rating: {avgRating.toFixed(1)} / 5</strong>
            <div>{renderStars(Math.round(avgRating))}</div>
          </div>

          {ratings.map((r) => (
            <div key={r.id} style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <strong>{r.rating} {renderStars(r.rating)}</strong>
                <small style={{ color: '#666' }}>
                  {new Date(r.created_at).toLocaleDateString()}
                </small>
              </div>
              <p style={{ margin: '5px 0', color: '#333' }}>{r.review_text}</p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export function RatingForm({ listingId, onSubmit }) {
  const { user } = useAuth()
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!user) {
      alert('Please log in to rate')
      return
    }

    setLoading(true)
    const error = await submitRating(supabase, listingId, user.id, rating, reviewText)
    setLoading(false)

    if (!error) {
      setSubmitted(true)
      onSubmit?.()
      setTimeout(() => setSubmitted(false), 3000)
    } else {
      alert('Failed to submit rating')
    }
  }

  return (
    <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
      <h4>Leave a Review</h4>
      {submitted && <p style={{ color: '#28a745' }}>Review submitted! ✓</p>}

      <div style={{ marginBottom: '10px' }}>
        <label>Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          disabled={loading}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value={5}>5 - Excellent</option>
          <option value={4}>4 - Good</option>
          <option value={3}>3 - Average</option>
          <option value={2}>2 - Poor</option>
          <option value={1}>1 - Very Poor</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Review (Optional)</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          disabled={loading}
          placeholder="Share your experience..."
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            minHeight: '80px',
            fontFamily: 'inherit',
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: '8px 16px',
          backgroundColor: loading ? '#ccc' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </div>
  )
}
