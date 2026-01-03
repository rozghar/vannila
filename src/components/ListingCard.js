import Link from 'next/link'

export default function ListingCard({ title, location, rating, image, role }) {
  const stars = []
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  for (let i = 0; i < full; i++) stars.push('full')
  if (half) stars.push('half')
  while (stars.length < 5) stars.push('empty')

  return (
    <div className="card">
      <div className="card-media">
        <img src={image} alt={title} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-sub">{location} • {role}</p>
        <div className="rating">
          <span className="rating-value">{rating.toFixed(1)}</span>
          <span className="stars">
            {stars.map((s, i) => (
              <span key={i} className={`star ${s}`}>★</span>
            ))}
          </span>
        </div>
        <div className="card-actions">
          <Link href="#"><button className="btn-secondary">View</button></Link>
        </div>
      </div>
    </div>
  )
}
