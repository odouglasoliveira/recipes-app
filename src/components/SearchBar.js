import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext, fetchAPI } from '../context/RecipesContext';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const { location, push } = useHistory();
  const { recipes, setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    if (recipes.length === 1) {
      const { pathname } = location;
      const { idMeal } = recipes[0];
      if (!idMeal) {
        const { idDrink } = recipes[0];
        push(`${pathname}/${idDrink}`);
      } else {
        push(`${pathname}/${idMeal}`);
      }
    }
  }, [location, push, recipes]);

  return (
    <form onSubmit={ (e) => e.preventDefault() }>
      <input
        data-testid="search-input"
        type="text"
        value={ searchValue }
        onChange={ ({ target }) => {
          try {
            if (searchType === 'first-letter' && target.value.length > 1) {
              global.alert('Your search must have only 1 (one) character');
              throw new Error('Your search must have only 1 (one) character');
            } else {
              setSearchValue(target.value);
            }
          } catch (error) {
            console.log(error.message);
          }
        } }
      />
      <label>
        Ingredientes
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="search-bar"
          value="ingredients"
          onClick={ ({ target }) => {
            setSearchValue('');
            setSearchType(target.value);
          } }
        />
      </label>
      <label>
        Nome
        <input
          type="radio"
          data-testid="name-search-radio"
          name="search-bar"
          value="name"
          onClick={ ({ target }) => {
            setSearchValue('');
            setSearchType(target.value);
          } }
        />
      </label>
      <label>
        Primeira palavra
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="search-bar"
          value="first-letter"
          onClick={ ({ target }) => {
            setSearchValue('');
            setSearchType(target.value);
          } }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        onClick={ async () => {
          const { pathname } = location;
          const data = await fetchAPI(
            pathname,
            searchType,
            searchValue,
          );
          if (!data) {
            global.alert('Sorry, we haven\'t found any recipes for these filters.');
            return;
          }
          const maxCards = 12;
          const newData = data.slice(0, maxCards);
          setRecipes(newData);
        } }
      >
        Buscar
      </button>
    </form>
  );
}
