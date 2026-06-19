"use client"

import { useState } from "react"
import { supabase } from "../../../lib/supabaseClient"
import { useParams, useRouter } from "next/navigation"

export default function UploadPage() {
  const { type } = useParams()
  const router = useRouter()

  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  async function upload() {
    if (!file) return alert("Please select a file")

    setUploading(true)

    // 1. get user
    const { data: auth } = await supabase.auth.getUser()
    const user = auth?.user

    if (!user) {
      alert("Not logged in")
      setUploading(false)
      return
    }

    // 2. upload file to storage
    const fileName = `${Date.now()}-${file.name}`

    const { error: storageError } = await supabase.storage
      .from("essays")
      .upload(fileName, file)

    if (storageError) {
      alert(storageError.message)
      setUploading(false)
      return
    }

    // 3. get public URL
    const { data } = supabase.storage
      .from("essays")
      .getPublicUrl(fileName)

    // 4. save to database
    const { error: dbError } = await supabase
      .from("essays")
      .insert({
        user_id: user.id,
        file_url: data.publicUrl,
        file_name: file.name,
        file_type: type,
        status: "submitted"
      })

    if (dbError) {
      alert(dbError.message)
      setUploading(false)
      return
    }

    alert("Upload successful!")

    router.push("/dashboard")
  }

  return (
    <div style={{
      padding: 40,
      fontFamily: "system-ui",
      background: "#f6f7fb",
      minHeight: "100vh"
    }}>

      <h1>📤 Upload {type.toUpperCase()}</h1>

      <div style={{
        background: "white",
        padding: 20,
        borderRadius: 12,
        maxWidth: 500
      }}>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={upload}
          disabled={uploading}
          style={{
            marginTop: 15,
            width: "100%",
            padding: 12,
            background: "#111827",
            color: "white",
            border: "none",
            borderRadius: 10
          }}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>

      </div>
    </div>
  )
}