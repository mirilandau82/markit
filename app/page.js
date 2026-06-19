"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f6f7fb",
      fontFamily: "system-ui"
    }}>

      <div style={{
        width: 380,
        background: "white",
        padding: 30,
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        textAlign: "center"
      }}>

        <h1 style={{ marginBottom: 5 }}>📘 Markit</h1>
        <p style={{ color: "#666", marginBottom: 20 }}>
          Essay marking platform
        </p>

        <button
          onClick={() => router.push("/login")}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 10,
            borderRadius: 10,
            border: "none",
            background: "#111827",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Student Login
        </button>

        <button
          onClick={() => router.push("/login?role=admin")}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 10,
            borderRadius: 10,
            border: "none",
            background: "#374151",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Admin Login
        </button>

      </div>
    </div>
  )
}