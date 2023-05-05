import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" />
        <Route exact path="/meals:id-da-receita" />
        <Route exact path="/meals:id-da-receita/in-progress" />
        <Route exact path="/drinks" />
        <Route exact path="/drinks:id-da-receita" />
        <Route exact path="/drinks:id-da-receita/in-progress" />
        <Route exact path="/profile" />
        <Route exact path="/done-recipes" />
        <Route exact path="/favorite-recipes" />
      </Switch>
    </div>
  );
}

export default App;
