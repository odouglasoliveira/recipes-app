import PropTypes from 'prop-types';
import shareIconSvg from '../images/shareIcon.svg';
import favIconSvg from '../images/whiteHeartIcon.svg';
import ChecklistIngredients from './ChecklistIngredients';

export default function RecipeInProgressCard({ recipe }) {
  return (
    <section>
      <img
        style={ { width: '300px' } }
        src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
        data-testid="recipe-photo"
      />

      <p
        data-testid="recipe-title"
      >
        {recipe.strMeal ? recipe.strMeal : recipe.strDrink}
      </p>

      <p data-testid="recipe-category">{ recipe.strCategory }</p>

      <button
        data-testid="share-btn"
      >
        <img src={ shareIconSvg } alt="" />
      </button>

      <button
        data-testid="favorite-btn"
      >
        <img src={ favIconSvg } alt="" />
      </button>

      <p data-testid="instructions">{recipe.strInstructions}</p>

      <ul>
        <ChecklistIngredients recipe={ recipe } />
      </ul>

      <button data-testid="finish-recipe-btn">
        Finalizar receita
      </button>

    </section>
  );
}

RecipeInProgressCard.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
  }).isRequired,
};
