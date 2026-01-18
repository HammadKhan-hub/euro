import React from "react"
import { createRoot } from "react-dom/client"

function App() {
  return React.createElement(
    "div",
    { style: { padding: "40px" } },
    React.createElement(
      "h1",
      { style: { fontSize: "32px", fontWeight: "700" } },
      "EuroTools is working"
    ),
    React.createElement(
      "p",
      null,
      "If you can see this, React loaded correctly."
    )
  )
}

const rootElement = document.getElementById("root")

if (rootElement) {
  createRoot(rootElement).render(React.createElement(App))
}
