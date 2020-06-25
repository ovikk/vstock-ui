import App from 'scenes/App';
import Login from 'scenes/Login';
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
    component: Login,
  },
  {
    name: 'App',
    path: '/app',
    component: App,
  },
];

export default appRoutes;
