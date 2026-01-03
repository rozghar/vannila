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
      <body>
        <AuthProvider>
          <Navigation />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}