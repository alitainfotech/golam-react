import { get, post } from "../AxiosConfig";

const URI = "/admin";

const login = (payload) => {
  const URL = `${URI}/auth`;
  return post(URL, payload);
};

const tenantList = (config) => {
  const URL = `${URI}/contractors`;
  return get(URL, config);
};

const accountList = (config) => {
  const URL = `${URI}/accounts`;
  return get(URL, config);
};

const AuthService = {
  login,
  tenantList,
  accountList,
};

export default AuthService;
