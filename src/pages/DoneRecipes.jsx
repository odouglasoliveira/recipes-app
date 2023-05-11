import { useEffect, useState } from 'react';
import Header from '../components/Header';
import FilterButtonsDoneRecipes from '../components/FilterButtonsDoneRecipes';
import DoneRecipeCard from '../components/DoneRecipeCard';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesLocalStorage) {
      setDoneRecipes(doneRecipesLocalStorage);
    }
  }, []);

  return (
    <div>
      <Header pageTitle="Done Recipes" />
      <FilterButtonsDoneRecipes />
      <ul>
        {
          doneRecipes.map((recipe, ind) => (<DoneRecipeCard
            key={ recipe.id }
            recipe={ recipe }
            index={ ind }
          />))
        }
      </ul>
    </div>
  );
}
