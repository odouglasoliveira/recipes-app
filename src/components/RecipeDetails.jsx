import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function RecipeDetails() {
  const [item, setItem] = useState([]);
  const { location } = useHistory();

  const fetchAPI = useCallback(async () => {
    const id = location.pathname.split('/').pop();
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
  }, [location]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  return (
    <>
      <h1>Details</h1>
      <h1>{ item[0]?.strMeal}</h1>
    </>
  );
}
