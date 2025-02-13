import { useEffect, useState } from "react";
import MealItam from "./MealItem.jsx";

export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();

      setMeals(resData);
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      { meals.map(meal => <MealItam meal={meal} key={meal.id} />)}
    </ul>
  );
}
