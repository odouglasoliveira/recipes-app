import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import RecipeCard from '../components/RecipeCard';

export default function Drinks() {
  const { recipes } = useContext(RecipesContext);
  return (
    <>
      <Header pageTitle="Drinks" showSearchIcon />
      {
        recipes.map((recipe, index) => (
          <RecipeCard
            key={ recipe.idDrink }
            index={ index }
            recipe={ recipe }
          />
        ))
      }
      <Recipes />
      <Footer />
    </>
  );
}
