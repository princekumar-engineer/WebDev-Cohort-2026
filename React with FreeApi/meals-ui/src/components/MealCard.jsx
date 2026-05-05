function MealCard({ meal }) {
  return (
    <div className="card">
    <img src={meal.strMealThumb} alt={meal.strMeal} alt="" />
    <p><strong>Category:</strong>{meal.strCategory}</p>
    <p><strong>Cuisine:</strong>{meal.strArea}</p>
    </div>
  )
}

export default MealCard