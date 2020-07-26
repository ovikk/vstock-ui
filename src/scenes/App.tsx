import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import LeftMenu from 'components/LeftMenu';
import appRoutes from 'routes/appRoutes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const App = () => {
  return (
    <AppWrapper>
      <Router>
        <GlobalStyle />
        <LeftMenu />
        <Switch>
          {appRoutes.map((route: any, i) => (
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
