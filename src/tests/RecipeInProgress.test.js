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

const mealsAddress = '/meals/52771/in-progress';
const whiteHeartIcon = 'whiteHeartIcon.svg';

describe('Renderize a pagina de progresso de uma COMIDA e veja se...', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => oneMeal,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('... o fetch é chamado 1 vez', () => {
    renderWithRouter(<App />, { initialEntries: [mealsAddress] });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('... se ao clicar no botão de compartilhar o link aparece o icone informando que copiou.', async () => {
    renderWithRouter(<App />, { initialEntries: [mealsAddress] });
    const btnShareEl = await screen.findByTestId('share-btn');

    act(() => {
      userEvent.click(btnShareEl);
    });
    const linkIsCopiedEl = screen.getByText(/link copied!/i);
    expect(linkIsCopiedEl).toBeInTheDocument();
  });
  it('... se ao clicar no botão de favoritar o botão fica com icone de coração preto e clicando novamente ele volta a ser branco.', async () => {
    renderWithRouter(<App />, { initialEntries: [mealsAddress] });
    const btnFavEl = await screen.findByTestId('favorite-btn');
    expect(btnFavEl).toBeInTheDocument();
    expect(btnFavEl).toHaveAttribute('src', whiteHeartIcon);

    act(() => {
      userEvent.click(btnFavEl);
    });

    expect(btnFavEl).toBeInTheDocument();
    expect(btnFavEl).toHaveAttribute('src', 'blackHeartIcon.svg');

    act(() => {
      userEvent.click(btnFavEl);
    });

    expect(btnFavEl).toBeInTheDocument();
    expect(btnFavEl).toHaveAttribute('src', whiteHeartIcon);
  });
  it('se ao clicar em todos os checkbox o botão de finalizar receita fica habilitado.', async () => {
    renderWithRouter(<App />, { initialEntries: [mealsAddress] });
    const penneRigateEl = await screen.findByLabelText('penne rigate');
    expect(penneRigateEl).toBeInTheDocument();

    const ulIngredientsEl = screen.getAllByRole('checkbox');
    expect(ulIngredientsEl).toHaveLength(2);

    ulIngredientsEl.forEach((ingredient, ind) => {
      const label = screen.getByTestId(`${ind}-ingredient-step`);
      userEvent.click(label);
    });

    const finishRecipeEl = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeEl).toBeInTheDocument();
    expect(finishRecipeEl).not.toBeDisabled();

    act(() => userEvent.click(finishRecipeEl));

    const doneRecipesTitleEl = screen.getByRole('heading', { name: /done recipes/i });
    expect(doneRecipesTitleEl).toBeInTheDocument();
  });
});

const drinksAddress = '/drinks/178319/in-progress';

describe('Renderize a pagina de progresso de uma BEBIDA e veja se...', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => oneDrink,
    });
  });
  it('... se ao clicar no botão de compartilhar o link aparece o icone informando que copiou.', async () => {
    renderWithRouter(<App />, { initialEntries: [drinksAddress] });
    const btnShareEl = await screen.findByTestId('share-btn');

    act(() => {
      userEvent.click(btnShareEl);
    });
    const linkIsCopiedEl = screen.getByText(/link copied!/i);
    expect(linkIsCopiedEl).toBeInTheDocument();
  });
  it('... se ao clicar no botão de favoritar o botão fica com icone de coração preto e clicando novamente ele volta a ser branco.', async () => {
    renderWithRouter(<App />, { initialEntries: [drinksAddress] });
    const btnFavEl = await screen.findByTestId('favorite-btn');
    expect(btnFavEl).toBeInTheDocument();
    expect(btnFavEl).toHaveAttribute('src', whiteHeartIcon);

    act(() => {
      userEvent.click(btnFavEl);
    });

    expect(btnFavEl).toBeInTheDocument();
    expect(btnFavEl).toHaveAttribute('src', 'blackHeartIcon.svg');

    act(() => {
      userEvent.click(btnFavEl);
    });

    expect(btnFavEl).toBeInTheDocument();
    expect(btnFavEl).toHaveAttribute('src', whiteHeartIcon);
  });
  it('se ao clicar em todos os checkbox o botão de finalizar receita fica habilitado.', async () => {
    renderWithRouter(<App />, { initialEntries: [drinksAddress] });
    const HpnotiqEl = await screen.findByLabelText('Hpnotiq');
    expect(HpnotiqEl).toBeInTheDocument();

    const ulIngredientsEl = screen.getAllByRole('checkbox');
    expect(ulIngredientsEl).toHaveLength(3);

    ulIngredientsEl.forEach((ingredient, ind) => {
      const label = screen.getByTestId(`${ind}-ingredient-step`);
      act(() => userEvent.click(label));
    });

    const finishRecipeEl = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeEl).toBeInTheDocument();
    expect(finishRecipeEl).not.toBeDisabled();

    act(() => userEvent.click(finishRecipeEl));

    const doneRecipesTitleEl = screen.getByRole('heading', { name: /done recipes/i });
    expect(doneRecipesTitleEl).toBeInTheDocument();
  });
});
