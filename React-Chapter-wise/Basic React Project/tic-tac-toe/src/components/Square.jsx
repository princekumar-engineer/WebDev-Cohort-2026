function Square({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-24 h-24 md:w-28 md:h-28 bg-slate-800 border-2 border-slate-600 rounded-xl text-4xl md:text-5xl font-bold text-white hover:bg-slate-700 transition duration-200 shadow-lg"
    >
      {value}
    </button>
  )
}

export default Square