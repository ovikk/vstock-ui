import env from './Env';

const loginUrl = `${env.server}/api/v1/login`;
const registrateUrl = `${env.server}/api/v1/signin`;
const logoutUrl = `${env.server}/api/v1/logout`;
const authUrl = `${env.server}/api/v1/auth`;

const userDataUrl = `${env.server}/api/v1/user`;
const outOfStockLoginUrl = `${env.server}/api/v1/markets/oos/login`;
const outOfStockLogoutUrl = `${env.server}/api/v1/markets/oos/logout`;

const theMarketGetCodeUrl = `${env.server}/api/v1/markets/tm/login/send`;
const theMarketLoginUrl = `${env.server}/api/v1/markets/tm/login`;
const theMarketLogoutUrl = `${env.server}/api/v1/markets/tm/logout`;

const getInventoryByIdUrl = `${env.server}/api/v1/inventory`;
const getSoldInventoryUrl = `${env.server}/api/v1/inventory/sold/`;
const getOwnInventoryUrl = `${env.server}/api/v1/inventory`;
const getDealersInventoryUrl = `${env.server}/api/v1/inventory/trusted/`;

// const getSneakersSuggestionsUrl = `${env.server}/api/v1/item/suggests`;
const getSneakersSuggestionsUrl = `${env.server}/api/v1/products/suggests`;

const itemUrl = `${env.server}/api/v1/item`;
const getMarketPricesUrl = `${env.server}/api/v1/item/price`;
const getItemSizeChartUrl = `${env.server}/api/v1/item/sizechart`;
const uploadImageUrl = `${env.server}/api/v1/item/images`;

const getOwnDealersUrl = `${env.server}/api/v1/merchants/dealers`;
const addDealerUrl = `${env.server}/api/v1/merchants/dealers/add`;
const getOwnBuyersUrl = `${env.server}/api/v1/merchants/buyers`;
const getInviteLinkUrl = `${env.server}/api/v1/invite`;

const getStatsAllUrl = `${env.server}/api/v1/stats?period=all`;
const getStatsYearUrl = `${env.server}/api/v1/stats?period=year`;
const getStatsMonthUrl = `${env.server}/api/v1/stats?period=month`;
const getStatsWeekUrl = `${env.server}/api/v1/stats?period=week`;

const getPreviewUrlPrefix = `${env.server}/api/v1/markets`;
const publishPreviewUrlPrefix = `${env.server}/api/v1/markets`;

const apiFetch = async (url: string, opts: any) => {
  try {
    const response = await fetch(url, opts);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log('oh shit');
    return {
      error: e,
    };
  }
};

const get = (url: string) =>
  apiFetch(url, {
    method: 'get',
    credentials: 'include',
  });

const _delete = (url: string) =>
  apiFetch(url, {
    method: 'delete',
    credentials: 'include',
  });

const post = (url: string, body: unknown) =>
  apiFetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    credentials: 'include',
  });

const put = (url: string, body: unknown) =>
  apiFetch(url, {
    method: 'put',
    body: JSON.stringify(body),
    credentials: 'include',
  });

const upload = (url: string, body: FormData) => {
  apiFetch(url, {
    method: 'post',
    body,
    credentials: 'include',
  });
};

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

const getUserData = () => {
  return get(userDataUrl);
};

const authOutOfStock = (email: string, password: string) => {
  return post(outOfStockLoginUrl, { login: email, password });
};

const logoutOutOfStock = () => {
  return post(outOfStockLogoutUrl, {});
};

const getTheMarketPasscode = (email: string) => {
  return post(theMarketGetCodeUrl, { email });
};

const sendTheMarketPasscode = (email: string, code: string) => {
  return post(theMarketLoginUrl, { email, code });
};

const logoutTheMarket = () => {
  return post(theMarketLogoutUrl, {});
};

const getInventoryById = (id: string | number) => {
  return get(`${getInventoryByIdUrl}/${id}`);
};

const getOwnInventory = () => {
  return get(getOwnInventoryUrl);
};

const getOwnSoldInventory = () => {
  return get(getSoldInventoryUrl);
};

const getSneakersSuggestions = (input: string) => {
  return get(`${getSneakersSuggestionsUrl}?q=${input}`);
};

const addItemToInventory = (data: any) => {
  return post(itemUrl, data);
};

const editItem = (data: any) => {
  return put(itemUrl, data);
};

const deleteItem = (itemId: number) => {
  return _delete(`${itemUrl}/${itemId}`);
};

const getItemSizeChartByStyleId = (styleId: string) => {
  return get(`${getItemSizeChartUrl}?styleID=${styleId}`);
};

const getItemSizeChartByChartId = (chartId: number) => {
  return get(`${getItemSizeChartUrl}?chartID=${chartId}`);
};

const getItemPrice = (itemId: number) => {
  return get(`${getMarketPricesUrl}/${itemId}`);
};

const getOwnDealers = () => {
  return get(getOwnDealersUrl);
};
const addDealer = (dealer: string) => {
  return get(`${addDealerUrl}/${dealer}`);
};
const deleteDealer = (dealerId: number) => {
  return _delete(getOwnDealersUrl + `/${dealerId}`);
};
const getOwnBuyers = () => {
  return get(getOwnBuyersUrl);
};
const getDealersInventory = () => {
  return get(getDealersInventoryUrl);
};
const getInviteLink = () => {
  return get(getInviteLinkUrl);
};

const getStatsAll = () => {
  return get(getStatsAllUrl);
};
const getStatsYear = () => {
  return get(getStatsYearUrl);
};
const getStatsMonth = () => {
  return get(getStatsMonthUrl);
};
const getStatsWeek = () => {
  return get(getStatsWeekUrl);
};

const uploadImages = (body: FormData) => {
  return upload(uploadImageUrl, body);
};

const getPreview = (market: string, id: number) => {
  return post(`${getPreviewUrlPrefix}/${market}/preview/${id}`, {})
  return post(`${getPreviewUrlPrefix}/${market}/preview/${id}`, {})
}

const publishItem = (market: string, id: number, body: object) => {
  return post(`${publishPreviewUrlPrefix}/${market}/publish/${id}`, body)
}

const api = {
  login,
  registrate,
  logout,
  auth,
  getInventoryById,
  getOwnInventory,
  getOwnSoldInventory,
  getSneakersSuggestions,
  addItemToInventory,
  editItem,
  deleteItem,
  getItemPrice,
  getOwnDealers,
  addDealer,
  deleteDealer,
  getOwnBuyers,
  getItemSizeChartByStyleId,
  getItemSizeChartByChartId,
  getDealersInventory,
  getInviteLink,
  getStatsAll,
  getStatsYear,
  getStatsMonth,
  getStatsWeek,
  uploadImages,
  getUserData,

  authOutOfStock,
  logoutOutOfStock,

  getTheMarketPasscode,
  sendTheMarketPasscode,
  logoutTheMarket,

  getPreview,
  publishItem
};

export default api;
