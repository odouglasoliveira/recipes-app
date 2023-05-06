import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import { renderWithRouter } from './helpers/renderWith';

describe('Renderize o Header e ...', () => {
  it('... verifique se renderiza o titulo passado como props e somente 1 botão.', () => {
    render(<Header pageTitle="Login" />);
    const titleEl = screen.getByRole('heading', { name: /login/i });
    expect(titleEl).toBeDefined();

    const btnsEl = screen.getAllByRole('button');
    expect(btnsEl).toHaveLength(1);
  });

  it('... verifique se renderiza 2 botões se passar a prop "searchIcon".', () => {
    render(<Header pageTitle="Login" showSearchIcon />);
    const btnsEl = screen.getAllByRole('button');
    expect(btnsEl).toHaveLength(2);
  });

  it('... verifique se vai para rota "profile" ao clicar no botão "profile".', () => {
    const { history } = renderWithRouter(<Header pageTitle="Login" showSearchIcon />);
    const btnProfileEl = screen.getByRole('button', { name: /icone de perfil/i });
    userEvent.click(btnProfileEl);
    expect(history.location.pathname).toBe('/profile');
  });
});
