'use client'

import Link from 'next/link'
import ListingCard from '@/components/ListingCard'

export default function Home() {
  const sampleListings = [
    {
      id: 1,
      title: 'Sundar Tuition Centre',
      location: 'Kolkata, West Bengal',
      rating: 4.6,
      role: 'teacher',
      image: 'https://placehold.co/600x400?text=Tuition+Centre',
    },
    {
      id: 2,
      title: 'Ajay Cabs',
      location: 'Guwahati, Assam',
      rating: 4.3,
      role: 'driver',
      image: 'https://placehold.co/600x400?text=Cab+Service',
    },
    {
      id: 3,
      title: 'Nadia Coaching',
      location: 'Agartala, Tripura',
      rating: 4.8,
      role: 'teacher',
      image: 'https://placehold.co/600x400?text=Coaching+Centre',
    },
    {
      id: 4,
      title: 'Local Helper',
      location: 'Bhubaneswar, Odisha',
      rating: 4.1,
      role: 'locals',
      image: 'https://placehold.co/600x400?text=Local+Service',
    },
  ]

  return (
    <div className="site-container">
      <header className="hero">
        <div className="hero-inner">
          <h1>Connect with local tutors, cabs and services</h1>
          <p className="lead">Serving West Bengal, Assam, Tripura and Odisha — find rated, trusted local providers.</p>

          <div className="search-row">
            <input className="search-input" placeholder="What are you looking for? e.g., tuitions, cab" />
            <select className="region-select">
              <option>West Bengal</option>
              <option>Assam</option>
              <option>Tripura</option>
              <option>Odisha</option>
            </select>
            <button className="btn-primary">Search</button>
          </div>

          <div className="auth-links">
            <Link href="/auth/register">Register</Link>
            <Link href="/auth/login">Login</Link>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="categories">
          <h2>Browse by category</h2>
          <div className="cats">
            <div className="cat">Tutors & Coaching</div>
            <div className="cat">Local Cabs</div>
            <div className="cat">Local Services</div>
            <div className="cat">Verified Drivers</div>
          </div>
        </section>

        <section className="listings">
          <h2>Featured providers</h2>
          <div className="cards-grid">
            {sampleListings.map(item => (
              <ListingCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}