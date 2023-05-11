import PropTypes from 'prop-types';

export default function DoneRecipeCard({ recipe, index }) {
  return (
    <li>
      <img
        style={ { width: '300px' } }
        src={ recipe.image }
        alt={ recipe.image }
        data-testid={ `${index}-horizontal-image` }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
      <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
      {
        recipe.tags.map((tag, ind) => (
          <ul
            key={ ind }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            <li>{tag}</li>
          </ul>
        ))
      }
      <button data-testid={ `${index}-horizontal-share-btn` }>Compartilhar</button>
    </li>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};
