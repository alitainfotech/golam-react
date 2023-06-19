import { startCase } from "lodash";
import { AuthToken } from "../constants";
import LocalstorageService from "./localstorage-service";

function updateAppTitle(pathname) {
  window.scrollTo(0, 0);
  const currentPage = startCase(pathname).replaceAll("-", " ");
  document.title = `${currentPage} | ${process.env.REACT_APP_APPLICATION_TITLE}`;
}

function checkAuthToken() {
  const token = LocalstorageService.getItem(AuthToken);
  return !!token;
}

function removeAuthToken() {
  LocalstorageService.removeItem(AuthToken);
}
export { updateAppTitle, checkAuthToken, removeAuthToken };
