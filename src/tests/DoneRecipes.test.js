import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
  },
});

describe('Renderize a página <DoneRecipes> COM localStorage e ...', () => {
  beforeEach(() => {
    setLocalStorage('doneRecipes', doneRecipes);
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('... veja se aparece o botão de copiar, click nele e veja se vai para o copiboard.', () => {
    const allBtnsShareEl = screen.getAllByRole('button', { name: /shareicon/i });
    expect(allBtnsShareEl).toHaveLength(2);

    userEvent.click(allBtnsShareEl[0]);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/meals/52771');

    const confirmCopyEl = screen.getByText(/link copied!/i);
    expect(confirmCopyEl).toBeInTheDocument();
  });

  it('... veja se os botões de filtro funcionam', () => {
    const btnFilterDrinksEl = screen.getByRole('button', { name: /drinks/i });
    const btnFilterMealsEl = screen.getByRole('button', { name: /meals/i });
    const btnFilterAllEl = screen.getByRole('button', { name: /all/i });

    expect(btnFilterDrinksEl).toBeInTheDocument();
    expect(btnFilterMealsEl).toBeInTheDocument();
    expect(btnFilterAllEl).toBeInTheDocument();

    userEvent.click(btnFilterDrinksEl);
    userEvent.click(btnFilterMealsEl);
    userEvent.click(btnFilterAllEl);

    const allBtnsShareEl = screen.getAllByRole('button', { name: /shareicon/i });
    expect(allBtnsShareEl).toHaveLength(2);
  });
});

describe('Renderize a página <DoneRecipes> SEM localStorage e ...', () => {
  beforeEach(() => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
  });
  it('... veja se não renderiza nada se não houver dado no localStorage.', () => {
    expect(screen.queryAllByRole('button', { name: /shareicon/i })).toHaveLength(0);
  });
});
