import { store } from "../redux/store";

export const isUserAuthenticated = () => {
  const state = store.getState();

  return state?.userCredential?.token ? true : false;
};
