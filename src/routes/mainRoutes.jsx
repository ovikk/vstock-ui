/* eslint-disable react/display-name */
import React from 'react';

import App from 'scenes/App';
import Login, { loginStates } from 'scenes/Login';
import Home from 'scenes/Home';

const appRoutes = [
  {
    name: 'App',
    path: '/app',
    isPrivate: true,
    component: App,
  },
  {
    name: 'Home',
    path: '/home',
    isPrivate: false,
    component: Home,
  },
  {
    name: 'Логин',
    path: '/login',
    isPrivate: false,
    component: () => <Login loginPropState={loginStates.login} />,
  },
  {
    name: 'Регистрация',
    path: '/registration',
    isPrivate: false,
    component: () => <Login loginPropState={loginStates.registration} />,
  },
];

export default appRoutes;
