import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import RecipeCard from '../components/RecipeCard';

export default function Meals() {
  const { recipes } = useContext(RecipesContext);
  return (
    <>
      <Header pageTitle="Meals" showSearchIcon />
      {
        recipes.map((recipe, index) => (<RecipeCard
          key={ recipe.idMeal }
          index={ index }
          recipe={ recipe }
        />))
      }
      <Recipes />
      <Footer />
    </>
  );
}
