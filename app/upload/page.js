"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const router = useRouter()

  const [paper, setPaper] = useState("")
  const [question, setQuestion] = useState("")
  const [file, setFile] = useState(null)

  const navy = "#4c535e"
  const green = "#617b75"

  const questionOptions = {
    "AQA Language Paper 1": [
      "Q2",
      "Q3",
      "Q4",
      "Q5",
      "Entire paper (Q1–Q5)"
    ],
    "AQA Language Paper 2": [
      "Q2",
      "Q3",
      "Q4",
      "Q5",
      "Entire paper (Q1–Q5)"
    ]
  }

  return (
    <div style={pageStyle}>

      <div style={cardStyle}>

        <h1 style={{ color: navy }}>Upload Your Essay</h1>

        <p style={{ color: "#64748b", marginBottom: 20 }}>
          Select paper, question, and upload your work
        </p>

        {/* PAPER DROPDOWN */}
        <div style={{ marginBottom: 15 }}>
          <label style={labelStyle}>Select Paper</label>

          <select
            value={paper}
            onChange={(e) => {
              setPaper(e.target.value)
              setQuestion("") // reset question
            }}
            style={inputStyle}
          >
            <option value="">Choose paper</option>
            <option value="AQA Language Paper 1">
              AQA Language Paper 1
            </option>
            <option value="AQA Language Paper 2">
              AQA Language Paper 2
            </option>
          </select>
        </div>

        {/* QUESTION DROPDOWN */}
        <div style={{ marginBottom: 15 }}>
          <label style={labelStyle}>Select Question</label>

          <select
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={inputStyle}
            disabled={!paper}
          >
            <option value="">Choose question</option>

            {questionOptions[paper]?.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        {/* FILE UPLOAD */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Upload File</label>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={inputStyle}
          />

          {file && (
            <p style={{ fontSize: 13, color: "#475569", marginTop: 5 }}>
              Selected: {file.name}
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          onClick={() => {
            alert(`Submitted: ${paper} - ${question}`)
          }}
          disabled={!paper || !question || !file}
          style={{
            ...primaryButton,
            opacity: (!paper || !question || !file) ? 0.5 : 1,
            cursor: (!paper || !question || !file) ? "not-allowed" : "pointer"
          }}
        >
          Submit for Marking
        </button>

        <button
          onClick={() => router.push("/")}
          style={secondaryButton}
        >
          Back to Home
        </button>

      </div>

    </div>
  )
}

/* ===== STYLES ===== */

const pageStyle = {
  fontFamily: "system-ui",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8fafc"
}

const cardStyle = {
  width: "100%",
  maxWidth: 520,
  background: "white",
  padding: 30,
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  textAlign: "center"
}

const inputStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: "1px solid #e2e8f0"
}

const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontWeight: 600,
  color: "#334155",
  textAlign: "left"
}

const primaryButton = {
  width: "100%",
  padding: 12,
  background: "#617b75",
  color: "white",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  cursor: "pointer",
  marginBottom: 10
}

const secondaryButton = {
  width: "100%",
  padding: 12,
  background: "#4c535e",
  color: "white",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  cursor: "pointer"
}