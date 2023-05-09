import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('Renderize o Header e ...', () => {
  let genericHistory = '';
  beforeEach(() => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    genericHistory = history;
  });

  it('... verifique se renderiza o titulo.', () => {
    const titleEl = screen.getByRole('heading', { name: /meals/i });
    expect(titleEl).toBeDefined();
  });

  it('... verifique se renderiza 4 botões.', () => {
    const btnsEl = screen.getAllByRole('button');
    expect(btnsEl).toHaveLength(5);
  });

  it('... verifique se vai para rota "profile" ao clicar no botão "profile".', () => {
    const btnProfileEl = screen.getByRole('button', { name: /icone de perfil/i });
    act(() => {
      userEvent.click(btnProfileEl);
    });
    expect(genericHistory.location.pathname).toBe('/profile');
  });

  it('... verifique se aparece o input de busca após clicar no botão "search".', () => {
    const btnSearchEl = screen.getByRole('button', { name: /icone de busca/i });
    expect(btnSearchEl).toBeDefined();

    expect(screen.queryByTestId('search-input')).toBeNull();

    userEvent.click(btnSearchEl);
  });
});
