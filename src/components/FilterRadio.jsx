import PropTypes from 'prop-types';

export default function FilterRadio({ filter }) {
  return (
    <li>
      <button
        data-testid={ `${filter.strCategory}-category-filter` }
      >
        { filter.strCategory }
      </button>
    </li>
  );
}

FilterRadio.propTypes = {
  filter: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
  }).isRequired,
};
