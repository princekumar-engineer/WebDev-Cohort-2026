import Square from "./Square"

function Board({ squares, onClick }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  )
}

export default Board