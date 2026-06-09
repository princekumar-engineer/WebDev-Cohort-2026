import { useState, useEffect } from "react";

import "./App.css";
import { ChaiMenu } from "./ChaiMenu";
import { useSpecialChai } from "./hooks/useSpecialChai";

function App() {
  const [data, setData] = useState(null);
  console.log(`${import.meta.env.VITE_API_URL}`);

  const { chai, loading, error } = useSpecialChai();




  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/all-chai`)
  //     .then((response) => response.json())
  //     .then((data) => setData(data))
  //     .then(() => console.log(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);
  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/all-chai`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //       console.log(data);
  //     })

  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1>Welcome to RAW react</h1>
      {/* <p>Data from API: {data ? JSON.stringify(data) : "Loading..."}</p> */}
      <ChaiMenu />
      <h2>Special Chai</h2>
      <p>{chai ? chai.name : "Loading..."}</p>
    </>
  );
}

export default App;
