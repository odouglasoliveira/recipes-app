import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <Header pageTitle="Profile" />
      <p data-testid="profile-email">{user?.email}</p>
      <Link to="/favorite-recipes">
        <button data-testid="profile-done-btn">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
      </Link>
      <button data-testid="profile-logout-btn">Logout</button>
      <Footer />
    </>
  );
}
