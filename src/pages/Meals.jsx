import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';
import MealRecipeCard from '../components/MealRecipeCard';

export default function Meals() {
  const { recipes } = useContext(RecipesContext);
  return (
    <>
      <Header pageTitle="Meals" showSearchIcon />
      {
        recipes.map((recipe, index) => (<MealRecipeCard
          data-testid={ `${index}-recipe-card` }
          key={ recipe.idMeal }
          index={ index }
          recipe={ recipe }
        />))
      }
      <Footer />
    </>
  );
}
