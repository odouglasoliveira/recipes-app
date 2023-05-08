import { useState } from 'react';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');

  const fetchAPI = async (URL) => {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data); // futuramente alterar esse log para um retorno ou um setState()
  };

  const handleApiURL = (type, search) => {
    const ingredientsURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
    const nameURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    const firstLetterURL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
    switch (type) {
    case 'ingredients':
      fetchAPI(ingredientsURL);
      break;
    case 'name':
      fetchAPI(nameURL);
      break;
    case 'first-letter':
      fetchAPI(firstLetterURL);
      break;
    default:
      break;
    }
  };
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
        onClick={ () => handleApiURL(searchType, searchValue.toLowerCase()) }
      >
        Buscar
      </button>
    </form>
  );
}
