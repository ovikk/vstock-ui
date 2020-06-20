import React from "react";
import styled from "styled-components";
import LeftMenu from "components/LeftMenu";
import appRoutes from "routes/appRoutes";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  return (
    <AppWrapper>
      <Router>
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

const AppWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background};

  height: 100%;
  width: 100%;
  display: flex;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  font-family: "Roboto";
`;

export default App;
