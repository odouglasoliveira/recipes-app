import PropTypes from 'prop-types';

export default function FilterButtonsDoneRecipes({ setFilterBy }) {
  return (
    <div>
      <button data-testid="filter-by-all-btn" onClick={ () => setFilterBy('') }>
        All
      </button>
      <button data-testid="filter-by-meal-btn" onClick={ () => setFilterBy('meal') }>
        Meals
      </button>
      <button data-testid="filter-by-drink-btn" onClick={ () => setFilterBy('drink') }>
        Drinks
      </button>
    </div>
  );
}

FilterButtonsDoneRecipes.propTypes = {
  setFilterBy: PropTypes.func.isRequired,
};
