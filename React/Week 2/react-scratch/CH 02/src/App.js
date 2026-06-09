import React from "https://esm.sh/react@19.0.0";
import ReactDOM from "https://esm.sh/react-dom@19.0.0/client";

const App = () => {
  return React.createElement(
    "div",
    {
      className: "container",
    },
    React.createElement("h1", null, "Hello, React!"),
  );
};
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
