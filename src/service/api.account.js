import { baseAxios, getAuthorizedAxios } from "./api.base";

export const signIn = (data) => {
  return baseAxios.post("account/signin", data);
};

export const signUp = (data) => {
  return baseAxios.post("account/signup", data);
};

export const extendToken = () => {
  return getAuthorizedAxios().post("account/extend");
};

export const getCurrentUserBasic = () => {
  return getAuthorizedAxios().get("users/me");
};

export const changeUserAvatar = (formData) => {
  return getAuthorizedAxios().put("users/me/avatar", formData);
};

export const changeUserBanner = (formData) => {
  return getAuthorizedAxios().put("users/me/banner", formData);
};

export const getProfileBasic = (id) => {
  return baseAxios.get(`users/${id}`);
};

export const getProfileStats = (id) => {
  return baseAxios.get(`users/${id}/stats`);
};

export const getUsers = (filter) => {
  const search = filter?.search || "";
  return baseAxios.get("users", {
    params: { search },
  });
};
