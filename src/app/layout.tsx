import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.scss";

export const metadata = {
  title: "My Regional Platform",
  description: "Connect teachers, drivers, and students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "Arial, sans-serif",
        }}
      >
        <AuthProvider>
          <Navigation />
          <main style={{ padding: "20px", height: "200vh" }}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
