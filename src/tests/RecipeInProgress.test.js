import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import { oneMeal } from './mock/mealToRecipeInProgress';
import { oneDrink } from './mock/drinkToRecipeInProgress';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
  },
});

const recipePhoto = 'recipe-photo';

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
    const imgRecipeEl = await screen.findByTestId(recipePhoto);
    const nameRecipeEl = screen.getByText(/Spicy Arrabiata Penne/i);
    const listIngredientsEl = screen.getByRole('list');

    expect(imgRecipeEl).toBeInTheDocument();
    expect(nameRecipeEl).toBeInTheDocument();
    expect(listIngredientsEl).toBeInTheDocument();
  });

  it('... se ao clicar no botão de compartilhar o link fica no clipboard.', async () => {
    const imgRecipeEl = await screen.findByTestId(recipePhoto);
    expect(imgRecipeEl).toBeInTheDocument();

    const btnShareEl = screen.getByTestId('share-btn');
    userEvent.click(btnShareEl);

    expect(navigator.clipboard.writeText).toBeCalledWith('http://localhost/meals/52771');
  });

  it('... se ao clicar no botão de favoritar o botão fica com icone de coração preto e clicando novamente ele volta a ser branco.', async () => {
    const imgRecipeEl = await screen.findByTestId(recipePhoto);
    expect(imgRecipeEl).toBeInTheDocument();

    const btnFavEl = screen.getByTestId('favorite-btn');

    act(() => {
      userEvent.click(btnFavEl);
    });

    expect(btnFavEl).toHaveAttribute('src', 'blackHeartIcon.svg');

    act(() => {
      userEvent.click(btnFavEl);
    });

    expect(btnFavEl).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });

  it('... se ao clicar em todos os checkbox o botão de finalizar receita fica habilitado.', async () => {
    const imgRecipeEl = await screen.findByTestId(recipePhoto);
    expect(imgRecipeEl).toBeInTheDocument();

    userEvent.click(screen.getByLabelText('penne rigate'));
    userEvent.click(screen.getByLabelText('olive oil'));

    const btnFinishEl = screen.getByRole('button', { name: /finalizar receita/i });
    expect(btnFinishEl).not.toBeDisabled();
    userEvent.click(btnFinishEl);
  });
});

describe('Renderize a pagina de progresso de uma BEBIDA e veja se ...', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => oneDrink,
    });
    renderWithRouter(<App />, { initialEntries: ['/drinks/178319/in-progress'] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('... o fetch é chamado apenas 1 vez e exibe as informações da receita.', async () => {
    expect(fetch).toHaveBeenCalledTimes(1);

    const imgRecipeEl = await screen.findByTestId(recipePhoto);
    const nameRecipeEl = screen.getByText(/Aquamarine/i);
    const listIngredientsEl = screen.getByRole('list');

    expect(imgRecipeEl).toBeInTheDocument();
    expect(nameRecipeEl).toBeInTheDocument();
    expect(listIngredientsEl).toBeInTheDocument();
  });

  it('... se ao clicar no botão de compartilhar o link fica no clipboard.', async () => {
    const imgRecipeEl = await screen.findByTestId(recipePhoto);
    expect(imgRecipeEl).toBeInTheDocument();

    const btnShareEl = screen.getByTestId('share-btn');
    userEvent.click(btnShareEl);

    expect(navigator.clipboard.writeText).toBeCalledWith('http://localhost/drinks/178319');
  });

  it('... se ao clicar no botão de favoritar o botão fica com icone de coração preto e clicando novamente ele volta a ser branco.', async () => {
    const imgRecipeEl = await screen.findByTestId(recipePhoto);
    expect(imgRecipeEl).toBeInTheDocument();

    const btnFavEl = screen.getByTestId('favorite-btn');

    act(() => {
      userEvent.click(btnFavEl);
    });

    expect(btnFavEl).toHaveAttribute('src', 'blackHeartIcon.svg');

    act(() => {
      userEvent.click(btnFavEl);
    });

    expect(btnFavEl).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });

  it('... se ao clicar em todos os checkbox o botão de finalizar receita fica habilitado.', async () => {
    const imgRecipeEl = await screen.findByTestId(recipePhoto);
    expect(imgRecipeEl).toBeInTheDocument();

    userEvent.click(screen.getByLabelText('Hpnotiq'));
    userEvent.click(screen.getByLabelText('Pineapple Juice'));
    userEvent.click(screen.getByLabelText('Banana Liqueur'));

    const btnFinishEl = screen.getByRole('button', { name: /finalizar receita/i });
    expect(btnFinishEl).not.toBeDisabled();

    userEvent.click(btnFinishEl);
  });
});
