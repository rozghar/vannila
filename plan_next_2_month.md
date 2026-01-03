# Regional Hiring Platform — 3‑Month Plan (West Bengal & Assam)

Build a fast, secure, low‑cost platform for Teachers, Drivers, and Students with free signups and a rating/review system.

## One‑line recommendation

- [ ] Build a Jamstack app with Next.js + Supabase + Vercel (free tiers) for fastest, lowest‑cost MVP.

## Tech Stack & Tools (minimal-cost)

- [ ] Frontend: Next.js (React)
- [ ] Hosting / CDN: Vercel (free tier)
- [ ] Auth / DB / Storage: Supabase (Postgres, Auth, Storage, RLS)
- [ ] Version control: GitHub
- [ ] Design/wireframes: Figma (free) or sketches
- [ ] Optional: Sentry (errors), SendGrid/Mailgun (transactional email), Google Analytics / Plausible

## 12‑Week Plan (weekly sprints)

### Week 0 — Pre‑start (3–4 days)

- [ ] Create GitHub repo, add README & license
- [ ] Draft simple wireframes: Homepage, Register, Login, Profiles, Search, Review form, Admin
- [ ] Create accounts: Vercel, Supabase, GitHub, Sentry (optional)
- [ ] Decide domain strategy (Vercel subdomain or buy domain)

### Weeks 1–2 — Sprint 1: Auth & Basic UI

- [ ] Initialize Next.js project
- [ ] Connect Supabase Auth
- [ ] Implement registration with role selection (student/teacher/driver) and state (West Bengal / Assam)
- [ ] Implement login, logout, protected routes
- [ ] Create basic navigation + profile page skeletons

### Weeks 3–4 — Sprint 2: Profiles & Search

- [ ] Build TeacherProfile form (subjects, experience, hourly rate, city)
- [ ] Build DriverProfile form (license_no, vehicle_type, city)
- [ ] Set up Supabase Storage for avatar / document uploads
- [ ] Implement search results and filters (state, city, role, subject)
- [ ] Display profile cards in search results

### Weeks 5–6 — Sprint 3: Ratings & Reviews

- [ ] Create reviews table (link reviewer -> provider)
- [ ] UI for submitting 1–5 star rating + comment
- [ ] Calculate & display average rating on profile cards and pages
- [ ] Prevent duplicate reviews; allow edit/delete by reviewer

### Weeks 7–8 — Sprint 4: Contact / Simple Booking

- [ ] Create contact/request form saved to DB (no payments)
- [ ] Provider inbox/dashboard showing incoming requests
- [ ] Optional: email notification for new requests (SendGrid/Mailgun free tier)

### Week 9 — Sprint 5: Admin & Moderation

- [ ] Admin pages: list users, reviews, messages
- [ ] Review moderation (remove or flag reviews)
- [ ] Verification flow: allow providers to upload ID/license for manual review
- [ ] Add captcha (reCAPTCHA/hCaptcha) on registration to reduce bots

### Week 10 — Security & Testing

- [ ] Implement Supabase Row Level Security (RLS) policies
- [ ] Validate & sanitize inputs server‑side
- [ ] Enforce email verification on signup
- [ ] Run end‑to‑end tests for core flows

### Week 11 — Performance, SEO & Polish

- [ ] Optimize images (Next.js Image), lazy loading
- [ ] Use SSG/ISR for public listing pages where possible
- [ ] Add meta tags and server‑rendered pages for SEO
- [ ] Prepare Privacy Policy & Terms pages

### Week 12 — Beta Launch & Monitoring

- [ ] Deploy to production (Vercel)
- [ ] Invite pilot users (local groups, friends)
- [ ] Monitor errors (Sentry) and usage analytics
- [ ] Collect feedback and plan fixes

## Minimal Data Model (core tables)

- [ ] users (Supabase Auth)
- [ ] profiles: id, user_id, role, state, city, display_name, bio, avatar_url, created_at
- [ ] teacher_profiles: profile_id, subjects (JSON), experience_years, hourly_rate, verified
- [ ] driver_profiles: profile_id, license_no (stored privately), vehicle_type, verified
- [ ] reviews: id, provider_profile_id, reviewer_user_id, rating (1–5), comment, created_at
- [ ] messages: id, from_user_id, to_profile_id, message, status, created_at

## Bootstrap Commands & Sample Snippets

### Initialize Next.js and install Supabase client:

- [ ] `npx create-next-app@latest my-regional-platform`
- [ ] `cd my-regional-platform`
- [ ] `npm install @supabase/supabase-js`

### Example Supabase client (lib/supabaseClient.js):

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Sign up with additional user metadata:

```javascript
const { data, error } = await supabase.auth.signUp(
  { email, password },
  { data: { role: 'teacher', state: 'westbengal' } }
)
```

## Security & Privacy Checklist (must-do)

- [ ] Use HTTPS everywhere (Vercel default)
- [ ] Supabase Row Level Security (RLS) so users edit only own data
- [ ] Email verification on signup
- [ ] Input validation & output sanitization to prevent XSS
- [ ] Rate‑limit endpoints and add captcha on registration/review forms
- [ ] Store sensitive documents in private storage; restrict access to verified admins
- [ ] Publish Privacy Policy & Terms of Use
- [ ] Add user reporting and admin moderation for abuse/fake reviews

## Performance & Speed Tips

- [ ] Use Vercel CDN and Next.js Image optimization
- [ ] Use SSG/ISR for public teacher/driver listings
- [ ] Lazy‑load non‑critical components and images
- [ ] Minimize client bundle size; split code where useful
- [ ] Monitor Lighthouse and optimize largest contentful paint (LCP)

## Minimal Cost Deployment Plan

- [ ] Use Vercel free subdomain (myapp.vercel.app) initially — zero cost
- [ ] Use Supabase free project for Auth, Postgres, Storage
- [ ] Optional paid: custom domain (~$10/year), transactional email at scale
- [ ] Track usage; upgrade only when necessary

## Launch Checklist (pre-launch)

- [ ] End‑to‑end test: signup, profile update, search, contact, review submission
- [ ] Confirm RLS and permission rules
- [ ] Confirm image/document upload and access settings
- [ ] Confirm email verification and contact notifications
- [ ] GDPR / data deletion flow (users can request deletion)
- [ ] Deploy and smoke test production URL

## Post‑launch (first 3 months)

- [ ] Track metrics: signups/day, active providers, reviews, contact requests
- [ ] Collect and triage user feedback
- [ ] Improve verification workflow and add badges
- [ ] Plan monetization (promoted listings, premium features) once trust/volume exist
- [ ] Keep a small bug & support backlog for weekly triage

## Risks & Mitigations

### Spam & fake reviews

- [ ] Mitigate: email verification, captchas, rate limits, manual review, report flow

### Provider verification cost

- [ ] Mitigate: start with manual doc upload + internal checks; add paid verification later

### Scaling costs

- [ ] Mitigate: throttle signups if necessary; monitor free tier usage and budget ahead

### Legal / Liability

- [ ] Mitigate: clear Terms that platform is a connector; consult local legal counsel before payments/background checks

## MVP Priority (what to build first)

### Must‑have

- [ ] Authentication and role selection
- [ ] Profile creation (teacher/driver/student)
- [ ] Search & filters by state/city/role
- [ ] Ratings & reviews (1–5 stars + comments)
- [ ] Contact/request form
- [ ] Admin moderation & RLS

### Nice‑to‑have (later)

- [ ] Payments/bookings, phone OTP, in‑app messaging, promotions, map/radius search

## Next Actions — choose one and I’ll generate it for you

- [ ] Generate a ready-to-run Supabase SQL schema for the tables above
- [ ] Create starter Next.js pages for Register/Login/Profile (code)
- [ ] Produce a two‑page Figma wireframe or PNG mockups
- [ ] Draft a short Privacy Policy & Terms template tuned to this platform