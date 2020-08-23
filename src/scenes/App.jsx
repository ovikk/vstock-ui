import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import LeftMenu from 'components/LeftMenu';
import Snackbar from '@material-ui/core/Snackbar';
import appRoutes from 'routes/appRoutes.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { hideSnackbar } from 'components/Snackbar/snackbarActions';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { showSnackbar, snackbarText } = useSelector((state) => state.snackbar);

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: '/app' },
        }}
      />
    );
  }

  return (
    <AppWrapper>
      <Router>
        <GlobalStyle />
        <LeftMenu />
        <Switch>
          {appRoutes.map((route, i) => (
            <Route
              path={route.path}
              render={(props) => <route.component {...props} />}
              key={i}
            />
          ))}

          <Route path="*">
            <Redirect to={{ pathname: appRoutes[0].path }} />
          </Route>
        </Switch>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={showSnackbar}
          onClose={() => dispatch(hideSnackbar())}
          message={snackbarText}
        />
      </Router>
    </AppWrapper>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Ubuntu';
  }
`;

const AppWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background};

  max-height: 100vh;
  max-width: 100vw;
  display: flex;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  font-family: ${(props) => props.theme.font};
`;

export default App;
