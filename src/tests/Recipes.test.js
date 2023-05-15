import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';

describe('Renderize o App e ...', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
  });

  it('... veja se o "fetch" foi chamado 2 vezes.', () => {
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('... veja se ao clicar no botão "beef" mostra só receitar da categoria "beef".', async () => {
    const btnBeefEl = await screen.findByRole('button', { name: /beef/i });
    expect(btnBeefEl).toBeInTheDocument();

    act(() => {
      userEvent.click(btnBeefEl);
    });

    const recipeTitleEl = await screen.findByRole('heading', { name: /beef and mustard pie/i });
    expect(recipeTitleEl).toBeInTheDocument();
  });

  it('... veja se ao clicar no botão "Limpar filtro" a lista de receita voltam ao original.', async () => {
    const btnBeefEl = await screen.findByRole('button', { name: /beef/i });
    expect(btnBeefEl).toBeInTheDocument();

    act(() => {
      userEvent.click(btnBeefEl);
    });

    const btnClearFilterEl = screen.getByRole('button', { name: /limpar filtro/i });
    act(() => {
      userEvent.click(btnClearFilterEl);
    });

    const recipeTitleEl = await screen.findByRole('heading', { name: /corba/i });
    expect(recipeTitleEl).toBeInTheDocument();
  });
});

describe('Renderize o App e ...', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
  });
  it('... veja se o "fetch" foi chamado 2 vezes.', () => {
    expect(fetch).toHaveBeenCalledTimes(2);
  });
  it('... veja se ao clicar no botão "ordinary drink" mostra só receitar da categoria "ordinary drink".', async () => {
    const ordinaryDrinkEl = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(ordinaryDrinkEl).toBeInTheDocument();

    act(() => {
      userEvent.click(ordinaryDrinkEl);
    });

    const recipeTitleEl = await screen.findByRole('heading', { name: /410 gone/i });
    expect(recipeTitleEl).toBeInTheDocument();
  });
});
