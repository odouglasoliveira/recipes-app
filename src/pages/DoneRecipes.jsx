import { useEffect, useState } from 'react';
import Header from '../components/Header';
import FilterButtonsDoneRecipes from '../components/FilterButtonsDoneRecipes';
import DoneRecipeCard from '../components/DoneRecipeCard';

export default function DoneRecipes() {
  const [doneRecipe, setDoneRecipe] = useState([]);

  useEffect(() => {
    const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipe(doneRecipesLocalStorage);
  }, []);

  return (
    <div>
      <Header pageTitle="Done Recipes" />
      <FilterButtonsDoneRecipes />
      <ul>
        {
          doneRecipe.map((recipe, ind) => (<DoneRecipeCard
            key={ recipe.id }
            recipe={ recipe }
            index={ ind }
          />))
        }
      </ul>
    </div>
  );
}
