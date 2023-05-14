import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

describe('Renderize a pagina profile ...', () => {
  it('... veja se vai para tela de receitas prontas ao clicar no botao de receitas prontas.', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const btnGoToDoneRecipesEl = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(btnGoToDoneRecipesEl);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('... veja se vai para tela de receitas favoritas ao clicar no botao de receitas favoritas.', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const btnGoToFavRecipesEl = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(btnGoToFavRecipesEl);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('... veja se faz logout', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const btnLogout = screen.getByRole('button', { name: /logout/i });
    userEvent.click(btnLogout);

    expect(history.location.pathname).toBe('/');
  });
});
