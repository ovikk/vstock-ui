/* eslint-disable react/display-name */
import React from 'react';
import App from 'scenes/App';
import Login, { loginStates } from 'scenes/Login';
import Home from 'scenes/Home';

const appRoutes = [
  {
    name: 'Home',
    path: '/home',
    component: Home,
  },
  {
    name: 'Логин',
    path: '/login',
    component: () => <Login loginPropState={loginStates.login} />,
  },
  {
    name: 'Регистрация',
    path: '/registration',
    component: () => <Login loginPropState={loginStates.registration} />,
  },
  {
    name: 'App',
    path: '/app',
    component: App,
  },
];

export default appRoutes;
