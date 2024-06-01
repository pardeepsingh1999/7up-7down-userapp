import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

import { store as REDUX_STORE } from "../redux/store";
import { clearUserCredential } from "../redux/actions";

export const logout = (navigate = null) => {
  REDUX_STORE.dispatch(clearUserCredential());

  if (navigate) navigate("/login", { replace: true });
  else window.location.reload();
};

export const showToast = (message = "Server error!", type = "error") => {
  toast[type](message);
};

export const structureQueryParams = (params) => {
  let queryStrings = "?";
  const keys = Object.keys(params);
  keys.forEach((key, index) => {
    queryStrings += key + "=" + params[key];
    if (params[keys[index + 1]]) {
      queryStrings += "&";
    }
  });
  return queryStrings;
};

export const errorHandler = (error) => {
  console.log("error>>", error);
  showToast(
    error?.reason?.length ||
      error?.reasons?.[0]?.message ||
      error?.message?.length
      ? error?.reason || error?.reasons?.[0]?.message || error?.message
      : "Something went wrong, Try again later."
  );
};

export const decodeToken = (token) => {
  return jwt_decode(token);
};
