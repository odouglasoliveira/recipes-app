import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const { push } = useHistory();

  const onInputChange = ({ target: { id, value } }) => {
    if (id === 'email') {
      setEmailInput(value);
    } else {
      setPassInput(value);
    }
  };

  // validação de login.
  // ideia de regex de verificação de email retirado do site:
  // https://www.w3resource.com/javascript/form/email-validation.php
  useEffect(() => {
    const SIX = 6;
    const emailIsValid = emailInput.toLowerCase()
      .match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/);

    if (passInput.length > SIX && emailIsValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [emailInput, passInput]);

  return (
    <section className="login-section">
      <div className="background-div">
        <span style={ { display: 'none' } }>BACKGROUND</span>
      </div>
      <div className="form-div">
        <form>
          <h1>App de Receitas</h1>
          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={ onInputChange }
              value={ emailInput }
              id="email"
              data-testid="email-input"
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={ onInputChange }
              value={ passInput }
              data-testid="password-input"
            />
          </div>
          <input
            type="submit"
            onClick={ (e) => {
              e.preventDefault();
              localStorage.setItem('mealsToken', 1);
              localStorage.setItem('cocktailsToken', 1);
              localStorage.setItem('user', JSON.stringify({ email: emailInput }));
              push('/meals');
            } }
            disabled={ isDisabled }
            value="Login"
            data-testid="login-submit-btn"
          />
        </form>
      </div>
    </section>
  );
}
