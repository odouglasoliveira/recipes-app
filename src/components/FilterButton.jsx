import PropTypes from 'prop-types';

export default function FilterButton({ filter, handleCategory }) {
  return (
    <button
      data-testid={ `${filter.strCategory}-category-filter` }
      onClick={ () => handleCategory(filter.strCategory) }
    >
      { filter.strCategory }
    </button>
  );
}

FilterButton.propTypes = {
  filter: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
  }).isRequired,
  handleCategory: PropTypes.func.isRequired,
};
