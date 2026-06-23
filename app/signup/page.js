"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function SignupPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [year, setYear] = useState("Year 9")

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

  async function signup() {
    setError("")
    setLoading(true)

    if (password !== confirm) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Optional profile insert (safe even if you don't have table yet)
    if (data?.user) {
      await supabase.from("profiles").insert([
        {
          id: data.user.id,
          name,
          email,
          year_group: year
        }
      ])
    }

    router.push("/login")
  }

  return (
    <div style={{
      fontFamily: "system-ui",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f8fafc"
    }}>

      <div style={{
        width: "100%",
        maxWidth: 420,
        background: "white",
        padding: 30,
        borderRadius: 14,
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        textAlign: "center"
      }}>

        <img src="/logo.png" style={{ height: 60, marginBottom: 20 }} />

        <h2 style={{ color: navy }}>Create your account</h2>
        <p style={{ color: "#64748b", marginBottom: 20 }}>
          Join Markit to improve your essays
        </p>

        {error && (
          <p style={{ color: "red", fontSize: 14 }}>{error}</p>
        )}

        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

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

        <input
          placeholder="Confirm password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={inputStyle}
        />

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={inputStyle}
        >
          <option>Year 9</option>
          <option>Year 10</option>
          <option>Year 11</option>
        </select>

        <button
          onClick={signup}
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            background: green,
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
            marginTop: 10
          }}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <p style={{ marginTop: 15, fontSize: 14 }}>
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            style={{ color: navy, cursor: "pointer", fontWeight: 600 }}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  )
}

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 10,
  borderRadius: 8,
  border: "1px solid #e2e8f0"
}