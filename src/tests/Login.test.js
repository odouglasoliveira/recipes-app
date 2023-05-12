import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

const mockLocalStorage = {
  setItem: jest.fn(),
};

global.localStorage = mockLocalStorage;

describe('Testando o componente Login', () => {
  test('Testando os Inputs', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByRole('textbox');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByPlaceholderText(/senha/i);
    expect(inputPassword).toBeInTheDocument();

    const titulo = screen.getByRole('heading', { name: /app de receitas/i });
    expect(titulo).toBeInTheDocument();

    const loginBtn = screen.getByRole('button', { name: /login/i });
    expect(loginBtn).toBeInTheDocument();

    act(() => {
      userEvent.type(inputEmail, 'emailValido@gmail.com');
      userEvent.type(inputPassword, '1234567');
    });
    userEvent.click(loginBtn);
    expect(titulo).not.toBeInTheDocument();
  });
});
