"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navy = "#4c535e"
  const green = "#617b75"

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser()
      if (data.user) router.push("/")
    }
    checkUser()
  }, [])

  async function login() {
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/")
  }

  async function googleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin
      }
    })

    if (error) {
      setError(error.message)
    }
  }

  return (
    <div style={pageStyle}>

      <div style={cardStyle}>

        <img src="/logo.png" style={{ height: 60, marginBottom: 20 }} />

        <h2 style={{ color: navy }}>Welcome back</h2>
        <p style={{ color: "#64748b", marginBottom: 20 }}>
          Sign in to continue to Markit
        </p>

        {error && (
          <p style={{ color: "red", fontSize: 14 }}>{error}</p>
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={login}
          disabled={loading}
          style={primaryButton}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <button
          onClick={googleLogin}
          style={secondaryButton}
        >
          Continue with Google
        </button>

        <p style={{ marginTop: 15, fontSize: 14 }}>
          No account?{" "}
          <span
            onClick={() => router.push("/signup")}
            style={{ color: green, cursor: "pointer", fontWeight: 600 }}
          >
            Sign up
          </span>
        </p>

      </div>

    </div>
  )
}

/* ===== STYLES ===== */

const pageStyle = {
  fontFamily: "system-ui",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8fafc"
}

const cardStyle = {
  width: "100%",
  maxWidth: 420,
  background: "white",
  padding: 30,
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  textAlign: "center"
}

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 10,
  borderRadius: 8,
  border: "1px solid #e2e8f0"
}

const primaryButton = {
  width: "100%",
  padding: 12,
  background: "#617b75",
  color: "white",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  cursor: "pointer",
  marginBottom: 10
}

const secondaryButton = {
  width: "100%",
  padding: 12,
  background: "#4c535e",
  color: "white",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  cursor: "pointer"
}