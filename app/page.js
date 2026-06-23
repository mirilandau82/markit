"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const navy = "#4c535e"
  const green = "#617b75"

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  async function signOut() {
  await supabase.auth.signOut()
  setUser(null)
  router.push("/")
}

  if (loading) {
    return (
      <div style={{ fontFamily: "system-ui", padding: 40 }}>
        Loading...
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "system-ui", background: "#f8fafc" }}>

      {/* NAVBAR */}
      <nav
        style={{
          background: navy,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
          position: "sticky",
          top: 0,
          zIndex: 100
        }}
      >
        <img src="/logo.png" alt="Markit" style={{ height: 60 }} />

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

            <div style={{ color: "white", fontWeight: 600 }}>
              Hello, {user.email.split("@")[0]}
            </div>

            <button
              onClick={signOut}
              style={{
                background: "#ffffff22",
                color: "white",
                border: "1px solid white",
                padding: "6px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.9rem"
              }}
            >
              Sign out
            </button>

          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            style={{
              background: green,
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Login / Sign Up
          </button>
        )}
      </nav>

      {/* HERO */}
      <section
        style={{
          textAlign: "center",
          padding: "90px 20px",
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >
        <h1 style={{ fontSize: "3rem", color: navy }}>
          Expert Essay Feedback.
          <br />
          Before It Matters.
        </h1>

        <p style={{ color: "#475569", marginTop: 20 }}>
          Markit connects students with experienced teachers and examiners
          who provide detailed feedback on essays and assignments.
        </p>

        <button
          onClick={() => {
  if (user) {
    router.push("/upload")
  } else {
    router.push("/login")
  }
}}
          style={{
            marginTop: 30,
            background: green,
            color: "white",
            border: "none",
            padding: "14px 28px",
            borderRadius: "10px",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Upload Your Essay
        </button>
      </section>

      {/* WHY SECTION */}
      <section style={{ background: "white", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

          <h2 style={{ textAlign: "center", color: navy, marginBottom: 40 }}>
            Why Use Markit?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 30
            }}
          >
            {[
              ["Real Experts", "Teachers and examiners who understand marking standards."],
              ["Clear Feedback", "Strengths, weaknesses, and actionable improvements."],
              ["Improve Faster", "Identify issues before final exams."],
              ["Fast Turnaround", "Get feedback quickly and efficiently."]
            ].map(([title, text]) => (
              <div
                key={title}
                style={{
                  background: "#ecedef",
                  padding: 25,
                  borderRadius: 14,
                  border: "1px solid #e2e8f0",
                  textAlign: "center"
                }}
              >
                <h3 style={{ color: navy }}>{title}</h3>
                <p style={{ color: "#475569" }}>{text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center", padding: "90px 20px" }}>
        <h2 style={{ color: navy }}>
          Every Great Essay Starts With Great Feedback
        </h2>

        <button
          onClick={() => router.push("/upload")}
          style={{
            marginTop: 20,
            background: navy,
            color: "white",
            border: "none",
            padding: "14px 30px",
            borderRadius: "10px",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Get Started
        </button>
      </section>

    </div>
  )
}