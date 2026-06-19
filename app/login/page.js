"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabaseClient"

export default function LoginPage() {
const router = useRouter()

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [loading, setLoading] = useState(false)

async function login() {
try {
setLoading(true)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert(error.message)
    return
  }

  const user = data.user

  if (!user) {
    alert("No user found")
    return
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profileError || !profile) {
    alert("No profile found")
    return
  }

  if (profile.role === "admin") {
    router.push("/admin")
  } else {
    router.push("/dashboard")
  }
} catch (err) {
  console.error(err)
  alert("Something went wrong")
} finally {
  setLoading(false)
}

}

return (
<div
style={{
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background: "#f6f7fb",
fontFamily: "system-ui"
}}
>
<div
style={{
background: "white",
padding: 30,
borderRadius: 16,
width: 400,
boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
}}
>
📘 Markit

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      style={{
        width: "100%",
        padding: 12,
        marginTop: 10,
        borderRadius: 8,
        border: "1px solid #ddd"
      }}
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={{
        width: "100%",
        padding: 12,
        marginTop: 10,
        borderRadius: 8,
        border: "1px solid #ddd"
      }}
    />

    <button
      onClick={login}
      disabled={loading}
      style={{
        width: "100%",
        marginTop: 15,
        padding: 12,
        border: "none",
        borderRadius: 8,
        background: "#111827",
        color: "white",
        cursor: "pointer"
      }}
    >
      {loading ? "Signing in..." : "Login"}
    </button>
  </div>
</div>

)
}