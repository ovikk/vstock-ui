import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import mainRoutes from 'routes/mainRoutes';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

import 'fonts/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            {mainRoutes.map((route: any, i) => (
              <Route
                path={route.path}
                render={(props) => <route.component {...props} />}
                key={i}
              />
            ))}
            <Route path="*">
              <Redirect to={{ pathname: mainRoutes[0].path }} />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
