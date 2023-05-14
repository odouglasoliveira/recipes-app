import PropTypes from 'prop-types';
import { useState } from 'react';
import shareIconSvg from '../images/shareIcon.svg';

export default function ButtonShare({ recipe, index }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClickCopy = () => {
    const { location: { protocol, host } } = window;
    const type = recipe.idDrink ? 'drink' : 'meal';
    const { id } = recipe;
    navigator.clipboard.writeText(`${protocol}//${host}/${type}s/${id}`);
    setIsCopied(true);
  };

  return (
    <>
      <button
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ handleClickCopy }
      >
        <img src={ shareIconSvg } alt="" />
      </button>
      {isCopied && <span>Link copied!</span> }
    </>
  );
}

ButtonShare.propTypes = {
  recipe: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
