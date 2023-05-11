import PropTypes from 'prop-types';
import shareIconSvg from '../images/shareIcon.svg';

export default function DoneRecipeCard({ recipe, index }) {
  const {
    image, category, nationality, name, doneDate, tags, alcoholicOrNot,
  } = recipe;
  return (
    <li>
      <img
        style={ { width: '300px' } }
        src={ image }
        alt={ image }
        data-testid={ `${index}-horizontal-image` }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${category} ${alcoholicOrNot || ''}`}
      </p>
      <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      {
        tags.map((tag, ind) => (
          <ul
            key={ ind }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            <li>{tag}</li>
          </ul>
        ))
      }
      <button src={ shareIconSvg } data-testid={ `${index}-horizontal-share-btn` }>
        <img src={ shareIconSvg } alt="shareIcon" />
      </button>
    </li>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    doneDate: PropTypes.string,
    nationality: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};
