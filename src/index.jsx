import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {
  ThemeProvider as MaterialThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
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

import ModifiedRoute from 'components/ModifiedRoute';

import 'fonts/index.css';

const materialTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

moment.locale('ru')

ReactDOM.render(
  <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MaterialThemeProvider theme={materialTheme}>
          <Router>
            <Switch>
              {mainRoutes.map((route, i) => (
                <ModifiedRoute
                  path={route.path}
                  render={(props) => <route.component {...props} />}
                  Component={route.component}
                  key={i}
                  isPrivate={route.isPrivate}
                />
              ))}
              <Route path="*">
                <Redirect to={{ pathname: mainRoutes[0].path }} />
              </Route>
            </Switch>
          </Router>
        </MaterialThemeProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
