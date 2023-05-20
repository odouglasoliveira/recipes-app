import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import profileIconSvg from '../images/profileIcon.svg';
import searchIconSvg from '../images/searchIcon.svg';
import headerLogo from '../images/headerLogo.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

export default function Header({ pageTitle, showSearchIcon = false }) {
  const [toggleShowSearch, setToggleShowSearch] = useState(false);
  const history = useHistory();
  return (
    <>
      <header>
        <img src={ headerLogo } alt="Logo do Aplicativo" />
        <div>
          {
            showSearchIcon
          && (
            <button
              data-testid="search-top-btn"
              src={ searchIconSvg }
              onClick={ () => { setToggleShowSearch((prevState) => !prevState); } }
            >
              <img
                src={ searchIconSvg }
                alt="icone de busca"
              />
            </button>

          )
          }
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
        </div>
      </header>
      <h2 data-testid="page-title">{ pageTitle }</h2>
      {
        toggleShowSearch
        && <SearchBar />
      }
    </>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool,
};
