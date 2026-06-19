"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../../lib/supabaseClient"
import { useParams, useRouter } from "next/navigation"

/* ---------------- MARK BANDS ---------------- */
const bands = {
  q2: { 1:[1,2], 2:[3,4], 3:[5,6], 4:[7,8] },
  q3: { 1:[1,2], 2:[3,4], 3:[5,6], 4:[7,8] },
  q4: { 1:[1,5], 2:[6,10], 3:[11,15], 4:[16,20] }
}

/* ---------------- COMMENT BANK ---------------- */
const commentBank = {
  q2: [
    "Clear understanding of language with some accurate analysis.",
    "Good analysis with relevant terminology.",
    "Strong analysis with well-developed explanation of effects.",
    "Excellent, precise and perceptive language analysis."
  ],
  q3: [
    "Basic awareness of structure.",
    "Some explanation of structural features.",
    "Clear understanding of structural shifts.",
    "Perceptive and sustained structural analysis."
  ],
  q4: [
    "Simple evaluation with limited support.",
    "Some clear evaluation with evidence.",
    "Developed evaluation with clear judgement.",
    "Convincing, balanced and perceptive evaluation."
  ]
}

/* ---------------- HELPERS ---------------- */
function getLevelFromMark(mark, band) {
  for (const [level, range] of Object.entries(band)) {
    if (mark >= range[0] && mark <= range[1]) return Number(level)
  }
  return 0
}

function getGrade(total) {
  if (total >= 70) return { grade: 9, borderline: total <= 72 }
  if (total >= 62) return { grade: 8, borderline: total <= 64 }
  if (total >= 54) return { grade: 7, borderline: total <= 56 }
  if (total >= 46) return { grade: 6, borderline: total <= 48 }
  if (total >= 38) return { grade: 5, borderline: total <= 40 }
  if (total >= 30) return { grade: 4, borderline: total <= 32 }
  return { grade: 3, borderline: false }
}

/* ---------------- MAIN ---------------- */
export default function MarkEssayPage() {
  const { id } = useParams()
  const router = useRouter()

  const [essay, setEssay] = useState(null)

  const [q1, setQ1] = useState(0)

  const [q2Mark, setQ2Mark] = useState(0)
  const [q2Level, setQ2Level] = useState(0)
  const [q2Comment, setQ2Comment] = useState("")

  const [q3Mark, setQ3Mark] = useState(0)
  const [q3Level, setQ3Level] = useState(0)
  const [q3Comment, setQ3Comment] = useState("")

  const [q4Mark, setQ4Mark] = useState(0)
  const [q4Level, setQ4Level] = useState(0)
  const [q4Comment, setQ4Comment] = useState("")

  const [q5_ao5, setQ5AO5] = useState(0)
  const [q5_ao6, setQ5AO6] = useState(0)

  const [loading, setLoading] = useState(false)

  /* ---------------- LOAD ESSAY ---------------- */
  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("essays")
        .select("*")
        .eq("id", id)
        .single()

      setEssay(data)

      setQ1(data.q1 || 0)

      setQ2Mark(data.q2_mark || 0)
      setQ2Level(data.q2_level || 0)
      setQ2Comment(data.q2_comment || "")

      setQ3Mark(data.q3_mark || 0)
      setQ3Level(data.q3_level || 0)
      setQ3Comment(data.q3_comment || "")

      setQ4Mark(data.q4_mark || 0)
      setQ4Level(data.q4_level || 0)
      setQ4Comment(data.q4_comment || "")

      setQ5AO5(data.q5_ao5 || 0)
      setQ5AO6(data.q5_ao6 || 0)
    }

    load()
  }, [id])

  /* ---------------- SCORE ---------------- */
  const total = q1 + q2Mark + q3Mark + q4Mark + q5_ao5 + q5_ao6
  const result = getGrade(total)

  /* ---------------- SAVE ---------------- */
  async function save() {
    setLoading(true)

    await supabase
      .from("essays")
      .update({
        q1,

        q2_mark: q2Mark,
        q2_level: q2Level,
        q2_comment: q2Comment,

        q3_mark: q3Mark,
        q3_level: q3Level,
        q3_comment: q3Comment,

        q4_mark: q4Mark,
        q4_level: q4Level,
        q4_comment: q4Comment,

        q5_ao5,
        q5_ao6,

        score: total,
        status: "marked"
      })
      .eq("id", id)

    alert("Saved!")
    router.push("/admin")
    setLoading(false)
  }

  /* ---------------- LEVEL MARK COMPONENT ---------------- */
  function LevelMark({ label, band, mark, setMark, level, setLevel }) {
    const availableMarks = level ? band[level] : []

    return (
      <div style={{
        background: "#fff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        border: "1px solid #eee"
      }}>
        <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>

        <select
          style={{ width: "100%", marginTop: 6 }}
          value={level}
          onChange={(e) => {
            const lvl = Number(e.target.value)
            setLevel(lvl)
            setMark(0)
          }}
        >
          <option value={0}>Select level</option>
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
          <option value={3}>Level 3</option>
          <option value={4}>Level 4</option>
        </select>

        {level > 0 && (
          <select
            style={{ width: "100%", marginTop: 6 }}
            value={mark}
            onChange={(e) => {
              const m = Number(e.target.value)
              setMark(m)
              setLevel(getLevelFromMark(m, band))
            }}
          >
            <option value={0}>Select mark</option>
            {availableMarks.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        )}
      </div>
    )
  }

  if (!essay) return <div style={{ padding: 40 }}>Loading...</div>

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      height: "100vh",
      fontFamily: "system-ui",
      background: "#f6f7fb"
    }}>

      {/* LEFT - ESSAY */}
      <div style={{ background: "#fff", borderRight: "1px solid #eee" }}>
        <h3 style={{ padding: 10 }}>📄 {essay.file_name}</h3>

        <iframe
          src={essay.file_url}
          style={{ width: "100%", height: "95vh" }}
        />
      </div>

      {/* RIGHT - MARKING */}
      <div style={{ padding: 15, overflowY: "auto" }}>

        <h2>🧠 Marking Panel</h2>

        {/* Q1 */}
        <div style={{ background: "#fff", padding: 10, borderRadius: 10 }}>
          <p>Q1 /4</p>
          <select value={q1} onChange={(e) => setQ1(Number(e.target.value))}>
            {[0,1,2,3,4].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Q2 */}
        <LevelMark label="Q2 /8" band={bands.q2} mark={q2Mark} setMark={setQ2Mark} level={q2Level} setLevel={setQ2Level} />

        <select value={q2Comment} onChange={(e) => setQ2Comment(e.target.value)}>
          <option value="">Q2 Feedback</option>
          {commentBank.q2.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        {/* Q3 */}
        <LevelMark label="Q3 /8" band={bands.q3} mark={q3Mark} setMark={setQ3Mark} level={q3Level} setLevel={setQ3Level} />

        <select value={q3Comment} onChange={(e) => setQ3Comment(e.target.value)}>
          <option value="">Q3 Feedback</option>
          {commentBank.q3.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        {/* Q4 */}
        <LevelMark label="Q4 /20" band={bands.q4} mark={q4Mark} setMark={setQ4Mark} level={q4Level} setLevel={setQ4Level} />

        <select value={q4Comment} onChange={(e) => setQ4Comment(e.target.value)}>
          <option value="">Q4 Feedback</option>
          {commentBank.q4.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        {/* SCORE */}
        <div style={{
          marginTop: 15,
          background: result.grade >= 7 ? "#ecfdf5" : "#fff7ed",
          padding: 10,
          borderRadius: 10
        }}>
          <h3>Total: {total}/80</h3>
          <h3>Grade: {result.grade}</h3>

          {result.borderline && (
            <p style={{ color: "red" }}>⚠ Borderline grade</p>
          )}
        </div>

        {/* SAVE */}
        <button
          onClick={save}
          style={{
            width: "100%",
            marginTop: 15,
            padding: 12,
            background: "#111827",
            color: "#fff",
            border: "none",
            borderRadius: 10
          }}
        >
          {loading ? "Saving..." : "Save Mark"}
        </button>

      </div>
    </div>
  )
}