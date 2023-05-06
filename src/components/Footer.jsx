import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const { location } = useHistory();
  console.log(location.pathname);

  if (
    location.pathname === '/meals'
    && location.pathname === '/drink'
    && location.pathname === '/profile'
  ) {
    return (
      <footer data-testid="footer">
        <img src={ drinkIcon } alt="Icon Drink" data-testid="drinks-bottom-btn" />
        <img src={ mealIcon } alt="Icon Meal" data-testid="meals-bottom-btn" />
      </footer>
    );
  }
}
