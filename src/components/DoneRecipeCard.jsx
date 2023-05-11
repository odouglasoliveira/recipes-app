import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIconSvg from '../images/shareIcon.svg';

const MIL = 1000;

export default function DoneRecipeCard({ recipe, index }) {
  const [isCopied, setIsCopied] = useState(false);
  const [timeIsCopied, setTimeIsCopied] = useState(1);
  const [idTimeIsCopied, setIdTimeIsCopied] = useState(0);

  const {
    image, category, nationality, name, doneDate, tags, alcoholicOrNot, id, type,
  } = recipe;

  const handleClickCopy = () => {
    const { location: { protocol, host } } = window;
    navigator.clipboard.writeText(`${protocol}//${host}/${type}s/${id}`);
    setIsCopied(true);
    setIdTimeIsCopied(setInterval(() => setTimeIsCopied((prev) => prev - 1), MIL));
  };

  useEffect(() => {
    if (!timeIsCopied) {
      clearInterval(idTimeIsCopied);
      setIsCopied(false);
      setTimeIsCopied(1);
    }
  }, [idTimeIsCopied, timeIsCopied]);

  return (
    <li>
      <Link to={ `/${type}s/${id}` }>
        <img
          style={ { width: '300px' } }
          src={ image }
          alt={ image }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${category} ${alcoholicOrNot || ''}`}
      </p>
      <Link
        to={ `/${type}s/${id}` }
        data-testid={ `${index}-horizontal-name` }
      >
        {name}
      </Link>
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
      <button
        src={ shareIconSvg }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ handleClickCopy }
      >
        <img src={ shareIconSvg } alt="shareIcon" />
      </button>
      {
        isCopied && <span>Link copied!</span>
      }
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
    type: PropTypes.string,
    id: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};
