"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function Signup() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [classYear, setClassYear] = useState("Year 9")
  const [loading, setLoading] = useState(false)

  const signup = async () => {
    setLoading(true)

    try {
      // 1. Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        alert(error.message)
        setLoading(false)
        return
      }

      const user = data?.user

      if (!user) {
        alert("Signup failed - no user returned")
        setLoading(false)
        return
      }

      // 2. Create profile row (IMPORTANT FIX)
      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        class: classYear,
        role: "user",
      })

      if (profileError) {
        alert(profileError.message)
        setLoading(false)
        return
      }

      alert("Account created! Please log in.")
      router.push("/login")

    } catch (err) {
      console.error(err)
      alert("Unexpected error during signup")
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Sign Up</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <select onChange={(e) => setClassYear(e.target.value)}>
        <option>Year 9</option>
        <option>Year 10</option>
        <option>Year 11</option>
      </select>

      <br /><br />

      <button onClick={signup} disabled={loading}>
        {loading ? "Creating..." : "Create Account"}
      </button>
    </div>
  )
}