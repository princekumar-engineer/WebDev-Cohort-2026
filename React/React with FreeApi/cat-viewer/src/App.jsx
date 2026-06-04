import { useState, useEffect } from 'react';


function App() {
  const [cat, setCat] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCat = () =>{
    setLoading(true);

    fetch("https://api.freeapi.app/api/v1/public/cats/cat/random")
    .then((res)=>res.json())
    .then((data) =>{
      setCat(data.data.image);
      setLoading(false);
    });
  };

  useEffect(()=>{
    fetchCat();
  }, [])

  return (
  <div className='container'>
    <h1>🐱 Random Cat Viewer</h1>

    {loading ? (
      <p>Loading...</p>
    ):(
      <img src={cat || null} alt="Random Cat" className='cat-img' />
    )}

  <button onClick={fetchCat}>Get New Cat</button>
  </div>
  )
}

export default App
