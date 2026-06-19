"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [essays, setEssays] = useState([])

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    const { data: auth } = await supabase.auth.getUser()
    const currentUser = auth?.user

    if (!currentUser) {
      router.push("/login")
      return
    }

    setUser(currentUser)

    const { data } = await supabase
      .from("essays")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false })

    setEssays(data || [])
  }

  const Card = ({ title, desc, onClick }) => (
    <div
      onClick={onClick}
      style={{
        background: "white",
        padding: 16,
        borderRadius: 12,
        cursor: "pointer",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ margin: "6px 0 0 0", color: "#666" }}>{desc}</p>
    </div>
  )

  return (
    <div style={{
      minHeight: "100vh",
      padding: 30,
      background: "#f6f7fb",
      fontFamily: "system-ui"
    }}>

      <h1>👋 Welcome {user?.email}</h1>

      <p style={{ color: "#666" }}>
        Submit your essays below
      </p>

      {/* SUBMISSION OPTIONS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 15,
        marginTop: 20
      }}>

        <Card
          title="📝 Submit Q2"
          desc="Language analysis"
          onClick={() => router.push("/upload/q2")}
        />

        <Card
          title="🧠 Submit Q3"
          desc="Structure question"
          onClick={() => router.push("/upload/q3")}
        />

        <Card
          title="⚖️ Submit Q4"
          desc="Evaluation question"
          onClick={() => router.push("/upload/q4")}
        />

        <Card
          title="✍️ Submit Q5"
          desc="Writing task"
          onClick={() => router.push("/upload/q5")}
        />

        <Card
          title="📄 Full Paper"
          desc="Q1–Q5 complete submission"
          onClick={() => router.push("/upload/full")}
        />
      </div>

      {/* PREVIOUS SUBMISSIONS */}
      <div style={{ marginTop: 40 }}>
        <h2>📊 Your Submissions</h2>

        {essays.length === 0 && (
          <p style={{ color: "#666" }}>
            No submissions yet
          </p>
        )}

        {essays.map((e) => (
          <div
            key={e.id}
            style={{
              background: "white",
              padding: 12,
              borderRadius: 10,
              marginTop: 10,
              border: "1px solid #eee"
            }}
          >
            <p style={{ margin: 0 }}>
              <b>{e.file_type?.toUpperCase()}</b> — {e.file_name}
            </p>

            <p style={{ margin: "5px 0 0 0", color: "#666" }}>
              Status: {e.status || "submitted"} | Score: {e.score ?? "TBD"}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}