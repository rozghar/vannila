"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./Navigation.scss";

export default function Navigation() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <nav className="nav glass-1">
      <div className="inner">
        <Link
          href="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          MyPlatform
        </Link>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {user ? (
            <>
              <Link
                href="/dashboard"
                style={{ color: "white", textDecoration: "none" }}
              >
                Dashboard
              </Link>
              <span style={{ fontSize: "12px", color: "#ccc" }}>
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                style={{ color: "white", textDecoration: "none" }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
