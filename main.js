import React from "react"
import { createRoot } from "react-dom/client"

function App() {
  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "700" }}>
        EuroTools is working
      </h1>
      <p>If you can see this, React loaded correctly.</p>
    </div>
  )
}

const rootElement = document.getElementById("root")

if (rootElement) {
  createRoot(rootElement).render(<App />)
}
