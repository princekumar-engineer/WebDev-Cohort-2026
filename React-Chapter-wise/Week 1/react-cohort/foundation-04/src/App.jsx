import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [value, setValue] = useState(5);
  // let value = 5;

  const increase = () => {
    setValue(value + 1); // NOT so good
  };

  const decrement = () => {
    setValue(value - 1); // NOT so good
  };

  return (
    <>
      <div>
        <h1>Value: {value}</h1>
        <button onClick={increase}>✅</button>
        <button onClick={decrement}>❌</button>
      </div>
    </>
  );
}

export default App;
