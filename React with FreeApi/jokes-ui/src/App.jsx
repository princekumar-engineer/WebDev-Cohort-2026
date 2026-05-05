import { useEffect, useState } from "react";

function App() {
  const [joke, setJoke] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchJoke = () => {
    setLoading(true);
    setShowAnswer(false);

    fetch("https://api.freeapi.app/api/v1/public/randomjokes")
      .then((res) => res.json())
      .then((data) => {
        const newJoke = data.data.data[0];

        // Prevent same joke repetition
        if (newJoke?.content === joke?.content) {
          fetchJoke();
          return;
        }

        setJoke({ ...newJoke });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="container">
      <h1>😂 Random Joke Generator</h1>

      {loading ? (
        <p>Loading joke...</p>
      ) : (
        <>
          <div className="card" key={joke.content}>
            <p className="question">{joke.content}</p>

            {showAnswer && (
              <p className="answer">{joke.answer}</p>
            )}
          </div>

          <div className="buttons">
            <button onClick={() => setShowAnswer(true)}>
              {showAnswer ? "😂 Nice!" : "Show Punchline"}
            </button>

            <button onClick={fetchJoke} disabled={loading}>
              {loading ? "Loading..." : "New Joke"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;