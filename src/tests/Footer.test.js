import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const testIdDrinks = 'drinks-bottom-btn';
const testIdMeals = 'meals-bottom-btn';

describe('Componente footer', () => {
  it('Ao renderizar em qualquer outra rota, não deve ser renderizado', () => {
    const initialEntries = ['/meals'];
    const { history } = renderWithRouter(<App />, { initialEntries });

    if (history.location.pathname === '/') {
      expect(screen.getByTestId(testIdDrinks)).not.toBeInTheDocument();
      expect(screen.getByTestId(testIdMeals)).not.toBeInTheDocument();
    }
  });

  it('É renderizado na rota "/meals"', () => {
    const initialEntries = ['/meals'];
    renderWithRouter(<App />, { initialEntries });

    const buttonDrink = screen.getByTestId(testIdDrinks);
    const buttonMeals = screen.getByTestId(testIdMeals);

    expect(buttonDrink).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
  });

  it('É renderizado na rota "/drinks"', () => {
    const initialEntries = ['/drinks'];
    renderWithRouter(<App />, { initialEntries });
    const buttonDrink = screen.getByTestId(testIdDrinks);
    const buttonMeals = screen.getByTestId(testIdMeals);
    expect(buttonDrink).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
  });

  it('É renderizado na rota "/profile"', () => {
    const initialEntries = ['/profile'];
    renderWithRouter(<App />, { initialEntries });
    const buttonDrink = screen.getByTestId(testIdDrinks);
    const buttonMeals = screen.getByTestId(testIdMeals);
    expect(buttonDrink).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
  });

  it('Ao clicar no icone de drink é renderizado para a rota "/drinks"', () => {
    const initialEntries = ['/drinks'];
    const { history } = renderWithRouter(<App />, { initialEntries });

    const buttonDrink = screen.getByTestId(testIdDrinks);

    userEvent.click(buttonDrink);
    waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
    });
  });

  it('Ao clicar no icone de meals é renderizado para a rota "/meals"', () => {
    const initialEntries = ['/drinks'];
    const { history } = renderWithRouter(<App />, { initialEntries });

    const buttonMeals = screen.getByTestId(testIdMeals);

    userEvent.click(buttonMeals);

    expect(history.location.pathname).toBe('/meals');
  });
});
