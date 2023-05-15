import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';
import { oneDrink } from './mock/drinkToRecipeInProgress';

describe('Testa o componente <SearchBar />', () => {
  beforeEach(() => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    window.alert = jest.fn();
    const searchBtn = screen.getByRole('img', {
      name: /icone de busca/i,
    });
    userEvent.click(searchBtn);
  });

  const searchText = 'search-input';
  const nameBtnText = 'name-search-radio';
  const searchBtnText = 'exec-search-btn';
  it('Testa se o input de pesquisa é limpo após trocar de categoria', () => {
    const searchInput = screen.getByTestId(searchText);
    const ingredientsBtn = screen.getByText(/ingredientes/i);

    userEvent.type(searchInput, 'chicken');
    expect(searchInput).toHaveValue('chicken');

    userEvent.click(ingredientsBtn);
    expect(searchInput).toHaveValue('');
  });

  it('Testa se um erro é lançado quando a categoria é "first letter" e é digitado mais de uma letra no input', () => {
    const alertMock = jest.spyOn(window, 'alert');
    const searchInput = screen.getByTestId(searchText);
    const firstLetterBtn = screen.getByText(/primeira palavra/i);

    userEvent.click(firstLetterBtn);
    userEvent.type(searchInput, 'teste');
    expect(alertMock).toBeCalled();
  });

  it('Testa se quando a api retorna uma comida só, o usuário é redirecionado para a página dessa receita', async () => {
    const searchInput = screen.getByTestId(searchText);
    const nameBtn = screen.getByTestId(nameBtnText);
    const searchBtn = screen.getByTestId(searchBtnText);
    userEvent.click(nameBtn);
    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(searchBtn);
    await waitFor(() => expect(searchBtn).not.toBeInTheDocument());
  });

  it('Testa se quando a api retorna um drink só, o usuário é redirecionado para a página dessa receita', async () => {
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);
    const showSearchBtn = screen.getByRole('img', {
      name: /icone de busca/i,
    });
    userEvent.click(showSearchBtn);
    const searchInput = screen.getByTestId(searchText);
    const nameBtn = screen.getByTestId(nameBtnText);
    const searchBtn = screen.getByTestId(searchBtnText);
    userEvent.click(nameBtn);
    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(searchBtn);
    await waitFor(() => expect(searchBtn).not.toBeInTheDocument());
  });

  it('Testa se é emitido um alerta quando não encontra nenhuma receita', async () => {
    const searchInput = screen.getByTestId(searchText);
    const nameBtn = screen.getByTestId(nameBtnText);
    const searchBtn = screen.getByTestId(searchBtnText);
    const alertSpy = jest.spyOn(window, 'alert');

    userEvent.click(nameBtn);
    userEvent.type(searchInput, 'xablauteste');
    userEvent.click(searchBtn);

    await waitFor(() => expect(alertSpy).toBeCalled());
  });

  it('Testa se busca apenas por 1 letra', async () => {
    const searchInput = screen.getByTestId(searchText);
    const nameBtn = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId(searchBtnText);
    userEvent.click(nameBtn);
    userEvent.type(searchInput, 's');
    userEvent.click(searchBtn);
    await waitFor(() => expect(searchBtn).not.toBeInTheDocument());
  });

  it('Testa se busca por ingrediente', async () => {
    const searchInput = screen.getByTestId(searchText);
    const nameBtn = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId(searchBtnText);
    userEvent.click(nameBtn);
    userEvent.type(searchInput, 'salt');
    userEvent.click(searchBtn);
    await waitFor(() => expect(searchBtn).not.toBeInTheDocument());
  });
});

describe('Testa o componente <SearchBar />', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => oneDrink,
    });
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const searchBtn = screen.getByRole('img', {
      name: /icone de busca/i,
    });
    userEvent.click(searchBtn);
  });

  it('Testa se o fetch é chamado 1 vez', () => {
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
