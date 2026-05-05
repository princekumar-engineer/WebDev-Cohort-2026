import { useState, useEffect } from 'react'
import MealCard from './components/MealCard.jsx'

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,  setError] = useState(null);

  useEffect(()=>{
    fetch("https://api.freeapi.app/api/v1/public/meals")
    .then((res)=>res.json())
    .then((data)=>{
      setMeals(data.data.data);
      setLoading(false);
    })
    .catch(()=>{
      setError("Failed to fetch meals");
      setLoading(false);
    })
  }, []);

  if (loading) return <h2 className='status'>Loading meals...</h2>
  if (error) return <h2 className='status'>Loading meals...</h2>
  

  return (
  <div className='container'>
    {meals.map((meal)=>(
      <MealCard key={meal.idMeal} meal={meal}/>
    ))}

  </div>
  )
}

export default App
