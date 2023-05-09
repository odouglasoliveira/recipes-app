import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { RecipesContext } from '../context/RecipesContext';
import FilterRadio from './FilterRadio';

const MAX_CARDS = 12;
const MAX_FILTERS = 5;

export default function Recipes() {
  const { recipes } = useContext(RecipesContext);
  const [dataRecipes, setDataRecipes] = useState([]);
  const [dataFilters, setDataFilters] = useState([]);
  const history = useHistory();

  const getEndPoint = (pathname) => {
    if (pathname === '/drinks') {
      return {
        recipes: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
        filters: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
      };
    }
    return {
      recipes: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      filters: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    };
  };

  const fetchDrinksOrMeals = useCallback(async () => {
    const { location: { pathname } } = history;
    const { recipes: ENDPOINT_RECIPES } = getEndPoint(pathname);
    const response = await fetch(ENDPOINT_RECIPES);
    const data = await response.json();
    const valuesOfData = Object.values(data);
    const reduceData = valuesOfData[0].splice(0, MAX_CARDS);
    setDataRecipes(reduceData);
  }, [history]);

  const fetchFiltersDrinksOrMeals = useCallback(async () => {
    const { location: { pathname } } = history;
    const { filters: ENDPOINT_FILTERS } = getEndPoint(pathname);
    const response = await fetch(ENDPOINT_FILTERS);
    const data = await response.json();
    const valuesOfData = Object.values(data);
    const reduceData = valuesOfData[0].splice(0, MAX_FILTERS);
    setDataFilters(reduceData);
  }, [history]);

  useEffect(() => {
    fetchDrinksOrMeals();
    fetchFiltersDrinksOrMeals();
  }, [fetchDrinksOrMeals, fetchFiltersDrinksOrMeals]);
  return (
    <div>
      <ul>
        {
          dataFilters.map((filter, ind) => (<FilterRadio
            filter={ filter }
            key={ ind }
          />))
        }
      </ul>
      {
        !recipes.length
          && (
            <ul>
              {
                dataRecipes.map((recipe, ind) => (<RecipeCard
                  recipe={ recipe }
                  index={ ind }
                  key={ ind }
                />))
              }
            </ul>
          )
      }
    </div>

  );
}
