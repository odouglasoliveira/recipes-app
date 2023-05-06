import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import { renderWithRouter } from './helpers/renderWith';

describe('Renderize o Header e ...', () => {
  it('... verifique se renderiza o titulo passado como props e somente 1 botão.', () => {
    renderWithRouter(<Header pageTitle="Login" />);
    const titleEl = screen.getByRole('heading', { name: /login/i });
    expect(titleEl).toBeDefined();

    const btnsEl = screen.getAllByRole('button');
    expect(btnsEl).toHaveLength(1);
  });

  it('... verifique se renderiza 2 botões se passar a prop "searchIcon".', () => {
    renderWithRouter(<Header pageTitle="Login" showSearchIcon />);
    const btnsEl = screen.getAllByRole('button');
    expect(btnsEl).toHaveLength(2);
  });

  it('... verifique se vai para rota "profile" ao clicar no botão "profile".', () => {
    const { history } = renderWithRouter(<Header pageTitle="Login" showSearchIcon />);
    const btnProfileEl = screen.getByRole('button', { name: /icone de perfil/i });
    userEvent.click(btnProfileEl);
    expect(history.location.pathname).toBe('/profile');
  });

  it('... verifique se aparece o input de busca após clicar no botão "search".', () => {
    renderWithRouter(<Header pageTitle="Login" showSearchIcon />);
    const btnSearchEl = screen.getByRole('button', { name: /icone de busca/i });
    expect(btnSearchEl).toBeDefined();

    expect(screen.queryByTestId('search-input')).toBeNull();

    userEvent.click(btnSearchEl);

    expect(screen.queryByTestId('search-input')).toBeInTheDocument();
  });
});
