import PropTypes from 'prop-types';

export default function Header({ titlePage, searchIcon, profileIcon }) {
  return (
    <header>
      {
        profileIcon
          && (
            <img
              src="../images/profileIcon.svg"
              alt="icone de perfil"
              data-testid="profile-top-btn"
            />
          )
      }
      <h1 data-testid="page-title">{ titlePage }</h1>
      {
        searchIcon
          && (
            <img
              src="../images/searchIcon.svg"
              alt="icone de perfil"
              data-testid="search-top-btn"
            />
          )
      }
    </header>
  );
}

Header.propTypes = {
  titlePage: PropTypes.string.isRequired,
  searchIcon: PropTypes.bool.isRequired,
  profileIcon: PropTypes.bool.isRequired,
};
