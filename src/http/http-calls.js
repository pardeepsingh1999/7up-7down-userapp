import { makeGetRequest, makePostRequest } from "./http-service";
import { BASE_URL } from "../config/index";

export const signin = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/signin`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const signup = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/signup`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const currentuser = () => {
  return new Promise((resolve, reject) => {
    makeGetRequest(`${BASE_URL}/currentuser`, true)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const rolldice = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/rolldice`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};
