import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [login, setLogin] = useState({ email: '', password: '' });
  const [isDisable, setIsDisabled] = useState(true);

  const validateImputs = () => {
    const NUMBERSIX = 6;
    const isValidEmail = emailRegex.test(login.email);
    const isValisPassword = login.password.trim().length >= NUMBERSIX;
    if (isValidEmail && isValisPassword) {
      setIsDisabled(false);
    } else { setIsDisabled(true); }
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    history.push();
  };

  return (
    <div className="main__login">
      <div className="form__login">
        <div className="div__login__img" />
        <form>
          <label htmlFor="email">
            <imput
              type="email"
              data-testid="email-input"
              id="email"
              placeholder="Email"
              name="email"
              value={ login.email }
              onChange={ ({ target: { name, value } }) => {
                setLogin({ ...login, [name]: value });
                validateImputs();
              } }
            />
          </label>
          <label htmlFor="password">
            <imput
              type="password"
              name="password"
              data-testid="password-input"
              id="password"
              value={ login.password }
              placeholder="Password"
              onChange={ ({ target: { name, value } }) => {
                setLogin({ ...login, [name]: value });
                validateImputs();
              } }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ isDisable }
            onClick={ handleSubmit }
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
