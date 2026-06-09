import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { BrokenCup } from "./BrokenCup";
import { ErrorBoundary } from "./ErrorBoundary.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Chai aur late night react</h1>
      <ErrorBoundary>
        <BrokenCup />
      </ErrorBoundary>
    </>
  );
}

export default App;
