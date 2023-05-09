import PropTypes from 'prop-types';

export default function RecipeCard({ recipe, index }) {
  return (
    <li
      style={
        { display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem' }
      }
      data-testid={ `${index}-recipe-card` }
    >
      <h4 data-testid={ `${index}-card-name` }>
        {recipe.strDrink ? recipe.strDrink : recipe.strMeal}
      </h4>
      <img
        style={ { width: '300px' } }
        src={ recipe.strDrinkThumb ? recipe.strDrinkThumb : recipe.strMealThumb }
        alt={ recipe.strDrinkThumb ? recipe.strDrinkThumb : recipe.strMealThumb }
        data-testid={ `${index}-card-img` }
      />
    </li>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
