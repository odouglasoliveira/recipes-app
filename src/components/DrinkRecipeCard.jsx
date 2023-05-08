import PropTypes from 'prop-types';

export function DrinkRecipeCard({ recipe, index }) {
  const { strDrink, strDrinkThumb } = recipe;
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
      <h4 data-testid={ `${index}-card-name` }>{strDrink}</h4>
      <img
        style={ { width: '300px' } }
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

DrinkRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
