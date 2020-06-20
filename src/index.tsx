import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import mainRoutes from "routes/mainRoutes";

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById("root")
);
