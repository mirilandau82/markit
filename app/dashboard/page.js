"use client"

import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()

  const navy = "#2b323f"
  const green = "#617b75"

  const cardStyle = {
    background: "white",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(43,50,63,0.08)",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.2s ease",
    minHeight: "180px",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }

  const sectionStyle = {
    background: "white",
    borderRadius: "24px",
    padding: "35px",
    marginBottom: "40px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.05)"
  }

  const statCard = {
    background: "white",
    borderRadius: "20px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0"
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "system-ui"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px"
        }}
      >
        {/* LOGO */}

        <img
          src="/logo.png"
          alt="Markit"
          style={{
            height: "120px",
            display: "block",
            margin: "0 auto 20px auto"
          }}
        />

        {/* WELCOME */}

        <h1
          style={{
            color: navy,
            textAlign: "center",
            fontSize: "2.8rem",
            marginBottom: "10px"
          }}
        >
          Welcome to Markit
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "1.1rem",
            maxWidth: "700px",
            margin: "0 auto 50px auto",
            lineHeight: "1.8"
          }}
        >
          Choose the essay you'd like reviewed by an experienced teacher or
          examiner. Upload your work, receive detailed feedback, and improve
          before it matters.
        </p>

        {/* SUBMISSION STATS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "50px"
          }}
        >
          <div style={statCard}>
            <h3
              style={{
                color: navy,
                marginBottom: "10px"
              }}
            >
              Pending Review
            </h3>

            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: green,
                margin: 0
              }}
            >
              0
            </p>
          </div>

          <div style={statCard}>
            <h3
              style={{
                color: navy,
                marginBottom: "10px"
              }}
            >
              Completed
            </h3>

            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: green,
                margin: 0
              }}
            >
              0
            </p>
          </div>
        </div>

        {/* LANGUAGE PAPER 1 */}

        <div style={sectionStyle}>
          <h2
            style={{
              color: navy,
              marginBottom: "25px"
            }}
          >
            English Language Paper 1
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px"
            }}
          >
            <div
              style={cardStyle}
              onClick={() => router.push("/upload?paper=L1&q=2")}
            >
              <h3>Question 2</h3>
              <p>Language Analysis</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => router.push("/upload?paper=L1&q=3")}
            >
              <h3>Question 3</h3>
              <p>Structure</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => router.push("/upload?paper=L1&q=4")}
            >
              <h3>Question 4</h3>
              <p>Evaluation</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => router.push("/upload?paper=L1&q=5")}
            >
              <h3>Question 5</h3>
              <p>Creative Writing</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => router.push("/upload?paper=L1&q=full")}
            >
              <h3>Full Paper</h3>
              <p>Questions 1–5</p>
            </div>
          </div>
        </div>

        {/* LANGUAGE PAPER 2 */}

        <div style={sectionStyle}>
          <h2
            style={{
              color: navy,
              marginBottom: "25px"
            }}
          >
            English Language Paper 2
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px"
            }}
          >
            <div
              style={cardStyle}
              onClick={() => router.push("/upload?paper=L2&q=2")}
            >
              <h3>Question 2</h3>
              <p>Summary</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => router.push("/upload?paper=L2&q=3")}
            >
              <h3>Question 3</h3>
              <p>Language Analysis</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => router.push("/upload?paper=L2&q=4")}
            >
              <h3>Question 4</h3>
              <p>Comparison</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => router.push("/upload?paper=L2&q=5")}
            >
              <h3>Question 5</h3>
              <p>Transactional Writing</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => router.push("/upload?paper=L2&q=full")}
            >
              <h3>Full Paper</h3>
              <p>Questions 1–5</p>
            </div>
          </div>
        </div>

        {/* RECENT SUBMISSIONS */}

        <div style={sectionStyle}>
          <h2
            style={{
              color: navy,
              marginBottom: "20px"
            }}
          >
            Recent Submissions
          </h2>

          <p
            style={{
              color: "#64748b",
              margin: 0
            }}
          >
            You haven't submitted any essays yet.
          </p>
        </div>
      </div>
    </div>
  )
}