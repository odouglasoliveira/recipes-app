import { useEffect, useState } from 'react';
import Header from '../components/Header';
import FilterButtonsDoneRecipes from '../components/FilterButtonsDoneRecipes';
import DoneRecipeCard from '../components/DoneRecipeCard';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesLocalStorage) {
      setDoneRecipes(doneRecipesLocalStorage);
    }
  }, []);

  return (
    <div>
      <Header pageTitle="Done Recipes" />
      <FilterButtonsDoneRecipes setFilterBy={ setFilterBy } />
      <ul>
        {
          doneRecipes
            .filter(({ type }) => type.includes(filterBy))
            .map((recipe, ind) => (<DoneRecipeCard
              key={ recipe.id }
              recipe={ recipe }
              index={ ind }
              setFilterBy={ setFilterBy }
            />))
        }
      </ul>
    </div>
  );
}
