import { useState } from "react"
import Board from "./components/Board"
import Status from "./components/Status"

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isXTurn, setIsXTurn] = useState(true)

  const calculateWinner = (board) => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for (let line of lines) {
      const [a,b,c] = line

      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a]
      }
    }

    return null
  }

  const winner = calculateWinner(squares)
  const isDraw = !winner && squares.every(square => square !== null)

  const handleClick = (index) => {
    if (squares[index] || winner) return

    const newSquares = [...squares]
    newSquares[index] = isXTurn ? "X" : "O"

    setSquares(newSquares)
    setIsXTurn(!isXTurn)
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null))
    setIsXTurn(true)
  }

  let statusMessage

  if (winner) {
    statusMessage = `🎉 Winner: ${winner}`
  } else if (isDraw) {
    statusMessage = "🤝 It's a Draw!"
  } else {
    statusMessage = `Turn: ${isXTurn ? "X" : "O"}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl text-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          Tic Tac Toe
        </h1>

        <Status message={statusMessage} />

        <Board
          squares={squares}
          onClick={handleClick}
        />

        <button
          onClick={resetGame}
          className="mt-6 px-6 py-3 bg-cyan-500 text-white rounded-xl font-semibold hover:bg-cyan-600 transition"
        >
          Reset Game
        </button>
      </div>
    </div>
  )
}

export default App