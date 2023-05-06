import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIconSvg from '../images/profileIcon.svg';
import searchIconSvg from '../images/searchIcon.svg';

export default function Header({ pageTitle, showSearchIcon = false }) {
  const history = useHistory();
  return (
    <header>
      <button
        data-testid="profile-top-btn"
        onClick={ () => { history.push('/profile'); } }
        src={ profileIconSvg }
      >
        <img
          src={ profileIconSvg }
          alt="icone de perfil"
        />
      </button>

      <h2 data-testid="page-title">{ pageTitle }</h2>
      {
        showSearchIcon
          && (
            <button
              data-testid="search-top-btn"
              src={ searchIconSvg }
            >
              <img
                src={ searchIconSvg }
                alt="icone de busca"
              />
            </button>

          )
      }
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool,
};
