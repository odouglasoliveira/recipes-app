import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { RecipesContext } from '../context/RecipesContext';
import FilterButton from './FilterButton';
import customFetch from '../helpers/customFetch';

const MAX_CARDS = 12;
const MAX_FILTERS = 5;

export default function Recipes() {
  const { recipes } = useContext(RecipesContext);
  const [dataRecipes, setDataRecipes] = useState([]);
  const [dataFilters, setDataFilters] = useState([]);
  const history = useHistory();

  const { location: { pathname } } = history;

  const getEndPoint = (path) => {
    if (path === '/drinks') {
      return {
        recipes: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
        filters: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
        category: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
      };
    }
    return {
      recipes: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      filters: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      category: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
    };
  };

  const fetchDrinksOrMeals = useCallback(async () => {
    const { recipes: ENDPOINT_RECIPES } = getEndPoint(pathname);
    const data = await customFetch(ENDPOINT_RECIPES);
    const valuesOfData = Object.values(data);
    const reduceData = valuesOfData[0].splice(0, MAX_CARDS);
    setDataRecipes(reduceData);
  }, [pathname]);

  const fetchFiltersDrinksOrMeals = useCallback(async () => {
    const { filters: ENDPOINT_FILTERS } = getEndPoint(pathname);
    const data = await customFetch(ENDPOINT_FILTERS);
    const valuesData = Object.values(data);
    setDataFilters(valuesData[0]);
  }, [pathname]);

  const handleCategory = async (endpoint) => {
    const { category } = getEndPoint(pathname);
    const data = await customFetch(`${category}${endpoint}`);
    const valuesOfData = Object.values(data);
    setDataRecipes(valuesOfData[0]);
  };

  const clearCategory = () => fetchDrinksOrMeals();

  useEffect(() => {
    fetchFiltersDrinksOrMeals();
    fetchDrinksOrMeals();
  }, []);

  return (
    <div>
      <div>
        {
          dataFilters
            .filter((filter, ind) => ind < MAX_FILTERS)
            .map((filter, ind) => (<FilterButton
              filter={ filter }
              key={ ind }
              handleCategory={ handleCategory }
            />))
        }
      </div>
      <button
        data-testid="All-category-filter"
        onClick={ clearCategory }
      >
        Limpar filtro
      </button>
      {
        !recipes.length
          && (
            <ul>
              {
                dataRecipes
                  .filter((filter, ind) => ind < MAX_CARDS)
                  .map((recipe, ind) => (<RecipeCard
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
