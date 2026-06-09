import { useState, useEffect } from "react";

export function ChaiMenu() {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/all-chai`)
      .then((response) => response.json())
      .then((data) => {
        setMenu(data);
        console.log(data);
      })

      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Chai Menu</h2>
      <ul>
        {menu
          ? menu.map((item) => <li key={item.id}>{item.name}</li>)
          : "Loading..."}
      </ul>
    </div>
  );
}
