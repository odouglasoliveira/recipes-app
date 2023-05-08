import PropTypes from 'prop-types';

export default function MealRecipeCard({ recipe, index }) {
  const { strMeal, strMealThumb } = recipe;
  return (
    <div
      style={
        { display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem' }
      }
      data-testid={ `${index}-recipe-card` }
    >
      <h4 data-testid={ `${index}-card-name` }>{strMeal}</h4>
      <img
        style={ { width: '300px' } }
        src={ strMealThumb }
        alt={ strMeal }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

MealRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
