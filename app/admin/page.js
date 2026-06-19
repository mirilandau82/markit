"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import Link from "next/link"

export default function Admin() {
  const [essays, setEssays] = useState([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data } = await supabase.from("essays").select("*")
    setEssays(data || [])
  }

  return (
    <div style={{ padding: 30, fontFamily: "system-ui" }}>
      <h1>🧑‍🏫 Admin Dashboard</h1>

      {essays.map(e => (
        <div key={e.id} style={card}>
          <p><b>{e.file_name}</b></p>
          <p>Status: {e.status}</p>

          <Link href={`/admin/${e.id}`}>
            Mark Essay →
          </Link>
        </div>
      ))}
    </div>
  )
}

const card = {
  padding: 15,
  border: "1px solid #ddd",
  borderRadius: 10,
  marginTop: 10
}