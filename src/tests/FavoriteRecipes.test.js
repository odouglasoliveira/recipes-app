import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

const favoriteRecipesMock = [{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
},
{
  id: '15997',
  type: 'drink',
  nationality: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Optional alcohol',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
}];

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

describe('Renderize a pagina de receitas favoritas e ...', () => {
  beforeEach(() => {
    renderWithRouter(<App />, { initialEntries: ['/favorite-recipes'] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('... veja se não aparece nada ao não passar um localStorage.', () => {
    expect(screen.queryByRole('link', { name: /spicy/i })).toBeNull();
  });

  it('... veja se o filtro de drinks funciona.', () => {
    setLocalStorage('favoriteRecipes', favoriteRecipesMock);

    const btnDrinksFilterEl = screen.getByRole('button', { name: /drinks/i });
    userEvent.click(btnDrinksFilterEl);

    expect(screen.queryByRole('link', { name: /spicy/i })).toBeNull();
  });

  it('... veja se desfavoritar a receita ela some da tela.', () => {
    setLocalStorage('favoriteRecipes', favoriteRecipesMock);

    const mealNameEl = screen.getByRole('link', { name: /spicy/i });
    expect(mealNameEl).toBeInTheDocument();

    const btnUnfav = screen.getByTestId('0-horizontal-favorite-btn');
    expect(btnUnfav);

    userEvent.click(btnUnfav);

    expect(screen.queryByRole('link', { name: /spicy/i })).toBeNull();
  });
});
