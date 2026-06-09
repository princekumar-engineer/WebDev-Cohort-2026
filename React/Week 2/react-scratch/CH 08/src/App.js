import React from "react";
import { teas } from "./data.js";

export default function App() {
  return React.createElement("div", { style: { color: "red" } }, [
    React.createElement("h1", { key: "h1" }, "Hello World"),
    React.createElement("p", { key: "p" }, "This is a paragraph"),
    React.createElement(
      "ul",
      { key: "ul" },
      teas.map((tea) =>
        React.createElement(
          "li",
          { key: tea.id },
          `${tea.name}: ${tea.description}`,
        ),
      ),
    ),
  ]);
}
