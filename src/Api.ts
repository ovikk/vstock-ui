import env from './Env';

const loginUrl = `${env.server}/api/v1/login`;

const get = (url: string, body: object) =>
  fetch(url, {
    method: 'get',
    credentials: 'include',
  });

const post = (url: string, body: object) =>
  fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    credentials: 'include',
  });

const login = (email: string, password: string) => {
  return post(loginUrl, { login: email, password });
};

const logout = () => {
  //   return del(loginUrl).then(clearLogin);
};

const api = {
  login,
  logout,
};

export default api;
