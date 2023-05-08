import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import SearchBar from '../components/SearchBar';

describe('Testa o componente <SearchBar />', () => {
  it('Testa se o input de pesquisa é limpo após trocar de categoria', () => {
    renderWithRouter(<SearchBar />);

    const searchInput = screen.getByTestId('search-input');
    const ingredientsBtn = screen.getByText(/ingredientes/i);

    userEvent.type(searchInput, 'chicken');
    expect(searchInput).toHaveValue('chicken');

    userEvent.click(ingredientsBtn);
    expect(searchInput).toHaveValue('');
  });

  it('Testa se um erro é lançado quando a categoria é "first letter" e é digitado mais de uma letra no input', () => {
    renderWithRouter(<SearchBar />);
    const alertMock = jest.spyOn(window, 'alert');
    const searchInput = screen.getByTestId('search-input');
    const firstLetterBtn = screen.getByText(/primeira palavra/i);

    userEvent.click(firstLetterBtn);
    userEvent.type(searchInput, 'teste');
    expect(alertMock).toBeCalled();
  });
});
