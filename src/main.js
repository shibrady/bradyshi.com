/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import MainNav from './containers/MainNavContainer';
import MainDesc from './containers/MainDescContainer';
import About from './containers/AboutMeContainer';
import Projects from './containers/ProjectsContainer';
import Blog from './containers/BlogContainer';
import RootReducer from './reducers/root';

let store = createStore(RootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={MainNav}>
        <IndexRoute component={MainDesc} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/blog" component={Blog} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
