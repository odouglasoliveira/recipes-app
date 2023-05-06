import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { handleApiURL } from '../context/RecipesContext';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const { location } = useHistory();
  return (
    <form onSubmit={ (e) => e.preventDefault() }>
      <input
        data-testid="search-input"
        type="text"
        value={ searchValue }
        onChange={ ({ target }) => {
          if (searchType === 'first-letter' && target.value.length > 1) {
            global.alert('Your search must have only 1 (one) character');
          } else {
            setSearchValue(target.value);
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
        onClick={ () => {
          handleApiURL(location.pathname, searchType, searchValue.toLowerCase());
        } }
      >
        Buscar
      </button>
    </form>
  );
}
