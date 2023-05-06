import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const { location, push } = useHistory();

  if (
    location.pathname === '/meals'
    || location.pathname === '/drinks'
    || location.pathname === '/profile'
  ) {
    return (
      <footer data-testid="footer">
        <button onClick={ () => push('/drinks') }>
          <img
            alt="Icon Drink"
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
          />
        </button>
        <button onClick={ () => push('/meals') }>
          <img
            alt="Icon Meal"
            data-testid="meals-bottom-btn"
            src={ mealIcon }
          />
        </button>
      </footer>
    );
  }
}
