import React from "react";
import App from "scenes/App";
import Login from "scenes/Login";

const appRoutes = [
  {
    name: "Home",
    path: "/home",
    component: () => <div>Home page</div>,
  },
  {
    name: "Логин",
    path: "/login",
    component: Login,
  },
  {
    name: "App",
    path: "/app",
    component: App,
  },
];

export default appRoutes;
