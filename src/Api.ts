import env from './Env';

const loginUrl = `${env.server}/api/v1/login`;
const registrateUrl = `${env.server}/api/v1/signin`;
const logoutUrl = `${env.server}/api/v1/logout`;
const authUrl = `${env.server}/api/v1/auth`;

const getInventoryByIdUrl = `${env.server}/api/v1/inventory`;
const getOwnInventoryUrl = `${env.server}/api/v1/inventory`;
const getSneakersSuggestionsUrl = `${env.server}/api/v1/item/suggests`;

const apiFetch = async (url: string, opts: any) => {
  const response = await fetch(url, opts);
  const data = await response.json();

  return data;
};

const get = (url: string) =>
  apiFetch(url, {
    method: 'get',
    credentials: 'include',
  });

const post = (url: string, body: unknown) =>
  apiFetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    credentials: 'include',
  });

const login = (email: string, password: string) => {
  return post(loginUrl, { login: email, password });
};

const registrate = (email: string, password: string) => {
  return post(registrateUrl, { login: email, password });
};

const logout = () => {
  return post(logoutUrl, {});
};

const auth = () => {
  return get(authUrl);
};

const getInventoryById = (id: string | number) => {
  return get(`${getInventoryByIdUrl}/${id}`);
};

const getOwnInventory = () => {
  return get(getOwnInventoryUrl);
};

const getSneakersSuggestions = (input: string) => {
  return get(`${getSneakersSuggestionsUrl}?q=${input}`);
};

const api = {
  login,
  registrate,
  logout,
  auth,
  getInventoryById,
  getOwnInventory,
  getSneakersSuggestions
};

export default api;
