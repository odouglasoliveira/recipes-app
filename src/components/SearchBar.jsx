export default function SearchBar() {
  return (
    <form onSubmit={ (e) => e.preventDefault() }>
      <input
        data-testid="search-input"
        type="text"
      />
      <label>
        Ingredientes
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="search-bar"
        />
      </label>
      <label>
        Nome
        <input
          type="radio"
          data-testid="name-search-radio"
          name="search-bar"
        />
      </label>
      <label>
        Primeira palavra
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="search-bar"
        />
      </label>
      <button
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );
}
