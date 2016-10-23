/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import MainNav from './containers/MainNavContainer';
import MainDesc from './containers/MainDescContainer';
import About from './containers/AboutMeContainer';
import RootReducer from './reducers/root';

let store = createStore(RootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={MainNav}>
        <IndexRoute component={MainDesc} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
