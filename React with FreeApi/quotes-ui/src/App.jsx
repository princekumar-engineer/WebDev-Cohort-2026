import { useState, useEffect } from 'react'

function App() {
  const [quotes, setQuotes] = useState([]);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetch("https://api.freeapi.app/api/v1/public/quotes")
    .then((res)=>res.json())
    .then((data)=>{
      const list = data.data.data
      setQuotes(list);
      setCurrent(list[Math.floor(Math.random() * list.length)])
      setLoading(false);
    });
  }, []);

  const newQuote = () =>{
    const random = quotes[Math.floor(Math.random()* quotes.length)];
    setCurrent(random);
  }

  if(loading) return <h2 className='status'>Loading quotes...</h2>
  return (
    <div className='container'>
      <h1>✨ Quote Generator</h1>

      <div className="card">
        <p className="quote">“{current.content}”</p>
        <p className="author">— {current.author}</p>
      </div>

      <button onClick={newQuote}>New Quote</button>
    </div>
  )
}

export default App
