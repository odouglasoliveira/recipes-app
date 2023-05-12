import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import { oneMeal } from './mock/mealToRecipeInProgress';
import { oneDrink } from './mock/drinkToRecipeInProgress';

describe('Renderize a pagina de progresso de uma COMIDA e veja se ...', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => oneMeal,
    });
    renderWithRouter(<App />, { initialEntries: ['/meals/52771/in-progress'] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('... o fetch é chamado apenas 1 vez e exibe as informações da receita.', async () => {
    expect(fetch).toHaveBeenCalledTimes(1);

    const imgRecipeEl = await screen.findByTestId('recipe-photo');
    const nameRecipeEl = screen.getByText(/Spicy Arrabiata Penne/i);
    const listIngredientsEl = screen.getByRole('list');

    expect(imgRecipeEl).toBeInTheDocument();
    expect(nameRecipeEl).toBeInTheDocument();
    expect(listIngredientsEl).toBeInTheDocument();
  });
});

describe('Renderize a pagina de progresso de uma BEBIDA e veja se ...', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => oneDrink,
    });
    renderWithRouter(<App />, { initialEntries: ['/meals/178319/in-progress'] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('... o fetch é chamado apenas 1 vez e exibe as informações da receita.', async () => {
    expect(fetch).toHaveBeenCalledTimes(1);

    const imgRecipeEl = await screen.findByTestId('recipe-photo');
    screen.debug();
    const nameRecipeEl = screen.getByText(/Aquamarine/i);
    const listIngredientsEl = screen.getByRole('list');

    expect(imgRecipeEl).toBeInTheDocument();
    expect(nameRecipeEl).toBeInTheDocument();
    expect(listIngredientsEl).toBeInTheDocument();
  });
});
