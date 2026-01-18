const root = document.getElementById("root");

const app = React.createElement(
  "div",
  null,
  React.createElement("h1", null, "React 18 UMD Works!"),
  React.createElement("p", null, "No JSX, works directly in browser")
);

ReactDOM.createRoot(root).render(app);
