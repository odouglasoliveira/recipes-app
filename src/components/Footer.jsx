import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const { push } = useHistory();

  return (
    <footer data-testid="footer">
      <button onClick={ () => push('/drinks') }>
        <img
          data-testid="drinks-bottom-btn"
          alt="Icon Drink"
          src={ drinkIcon }
        />
      </button>
      <button onClick={ () => push('/meals') }>
        <img
          data-testid="meals-bottom-btn"
          alt="Icon Meal"
          src={ mealIcon }
        />
      </button>
    </footer>
  );
}
