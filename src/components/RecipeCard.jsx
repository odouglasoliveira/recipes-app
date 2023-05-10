import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
      <Link
        to={ recipe.idDrink ? `/drinks/${recipe.idDrink}` : `/meals/${recipe.idMeal}` }
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
      </Link>
    </li>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
