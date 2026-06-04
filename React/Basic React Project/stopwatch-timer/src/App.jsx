import Stopwatch from "./components/Stopwatch"
import Timer from "./components/Timer"

function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-4xl font-bold text-white">
        Stopwatch & Timer App
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <Stopwatch />
        <Timer />
      </div>
    </div>
  )
}

export default App