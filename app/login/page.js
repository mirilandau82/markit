"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useRouter, useSearchParams } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const forcedRole = searchParams.get("role")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) return alert(error.message)

    const user = data.user

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (!profile) {
      alert("No profile found")
      return
    }

    if (profile.role === "admin" || forcedRole === "admin") {
      router.push("/admin")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={input}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        style={input}
      />

      <button onClick={login} style={btn}>
        Login
      </button>
    </div>
  )
}

const input = {
  display: "block",
  marginTop: 10,
  padding: 10,
  width: 300
}

const btn = {
  marginTop: 15,
  padding: 10,
  width: 300,
  background: "#111827",
  color: "white",
  border: "none",
  borderRadius: 8
}