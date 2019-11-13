import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import {MainPage, StartPage, AuthPage, NotFound} from './page'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={StartPage} />
        <Route path='/main' component={MainPage} />
        <Route path='/auth' component={AuthPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
