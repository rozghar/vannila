import { AuthProvider } from '@/context/AuthContext'
import Navigation from '@/components/Navigation'
import './globals.css'

export const metadata = {
  title: 'My Regional Platform',
  description: 'Connect teachers, drivers, and students',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9' }}>
        <AuthProvider>
          <Navigation />
          <main style={{ padding: '20px' }}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}