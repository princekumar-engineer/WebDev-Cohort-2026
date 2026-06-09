import { useState } from "react";

export function BrokenCup() {
  const [isBroken, setIsBroken] = useState(false);

  if (isBroken) {
    throw new Error("The cup is broken!");
  }

  return (
    <div>
      <p>The cup is intact.</p>
      <button onClick={() => setIsBroken(true)}>Break the cup</button>
    </div>
  );
}
