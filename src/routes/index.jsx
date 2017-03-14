import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import {isLoggedIn} from '../auth'
import LoginRoute from './login'
import CreateAccountRoute from './create-account'
import BoardRoute from './board';
import BoardListRoute from './board/list';
import BoardViewRoute from './board/view';


import App from '../App';

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={isLoggedIn}></Route>
      <Route path="board" component={BoardRoute}>
        <Route path="list" component={BoardListRoute}></Route>
        <Route path=":boardId" component={BoardViewRoute}></Route>
      </Route>
      <Route path="/create-account" component={CreateAccountRoute} onEnter={isLoggedIn}></Route>
      <Route path="/login" component={LoginRoute} onEnter={isLoggedIn}></Route>
    </Router>
  );
};

export default Routes;