import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';
import { DrinkRecipeCard } from '../components/DrinkRecipeCard';

export default function Drinks() {
  const { recipes } = useContext(RecipesContext);
  return (
    <>
      <Header pageTitle="Drinks" showSearchIcon />
      {
        recipes.map((recipe, index) => (
          <DrinkRecipeCard
            key={ recipe.idDrink }
            index={ index }
            recipe={ recipe }
          />
        ))
      }
      <Footer />
    </>
  );
}
