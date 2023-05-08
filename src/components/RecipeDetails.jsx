import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function RecipeDetails() {
  const { location } = useHistory();
  const [item, setItem] = useState([]);
  useEffect(() => {
    const id = location.pathname.split('/').pop();
    const fetchAPI = async () => {
      if (location.pathname.includes('/meals')) {
        const URL_MEALS = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const apiMeals = await fetch(URL_MEALS);
        const data = await apiMeals.json();
        setItem(data.meals);
      }
      if (location.pathname.includes('/drinks')) {
        const URL_DRINKS = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const apiDrinks = await fetch(URL_DRINKS);
        const data = await apiDrinks.json();
        setItem(data.drink);
      }
    };
    fetchAPI();
  }, [location]);

  return (
    <h1>{item[0].strMeal}</h1>
  );
}
