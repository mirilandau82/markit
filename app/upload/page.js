"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function Upload() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const uploadFile = async () => {
    if (!file) {
      alert("Pick a file first")
      return
    }

    setUploading(true)

    try {
      const fileName = `${Date.now()}-${file.name}`

      // 1. Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("essays")
        .upload(fileName, file)

      console.log("UPLOAD ERROR:", uploadError)

      if (uploadError) {
        alert(uploadError.message)
        setUploading(false)
        return
      }

      // 2. Get public URL
      const { data: urlData } = supabase.storage
        .from("essays")
        .getPublicUrl(fileName)

      const fileUrl = urlData.publicUrl

      console.log("FILE URL:", fileUrl)

      // 3. Get logged in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      console.log("USER:", user)
      console.log("USER ERROR:", userError)

      if (!user) {
        alert("No logged in user found.")
        setUploading(false)
        return
      }

      // 4. Save to database
      const { data: insertData, error: dbError } = await supabase
        .from("essays")
        .insert({
          user_id: user.id,
          file_url: fileUrl,
          file_name: file.name,
          file_type: file.type,
          status: "submitted",
        })
        .select()

      console.log("INSERT DATA:", insertData)
      console.log("DB ERROR:", dbError)

      if (dbError) {
        alert(dbError.message)
        setUploading(false)
        return
      }

      alert("Essay uploaded successfully!")
    } catch (err) {
      console.error("UNEXPECTED ERROR:", err)
      alert("Unexpected error. Check console.")
    }

    setUploading(false)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Upload your essay</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={uploadFile} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  )
}