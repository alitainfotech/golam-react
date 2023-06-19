import axios from "axios";
import { toast } from "react-toastify";

import { AuthToken } from "./constants";
import LocalstorageService from "./helpers/localstorage-service";

// Apply base url for axios
const API_URL = process.env.REACT_APP_API_URL || "";
const axiosApi = axios.create({
  baseURL: API_URL,
});

const ERR_500MSG = "Something Bad Happened! Please Contact Administrator.";

axiosApi.interceptors.request.use(
  (config) => {
    const token = LocalstorageService.getItem(AuthToken);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(">REQ_ERR: ", error?.message);
    toast.error(ERR_500MSG, { toastId: "REQ_ERR" });
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(">RES_ERR: ", error?.message);
    toast.error(ERR_500MSG, { toastId: "RES_ERR" });
    return Promise.reject(error);
  }
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config });
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config });
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config });
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config });
}

export async function delPayload(url, data = {}, config = {}) {
  return await axiosApi.delete(url, {
    Authorization: { ...config },
    data: { ...data },
  });
}

export async function postFormData(url, data, config = {}) {
  return axiosApi.post(url, data, {
    "Content-Type": "multipart/form-data",
    ...config,
  });
}

export async function putFormData(url, data, config = {}) {
  return axiosApi.put(url, data, {
    "Content-Type": "multipart/form-data",
    ...config,
  });
}
