import { USER_ROLE } from "../data/constants.js";

export const isUserSignedIn = () => {
  return localStorage.getItem("username") !== null;
};

export const getUserRole = () => {
  return localStorage.getItem("role");
};

export const isCustomerSignedIn = () => {
  return localStorage.getItem("role") === USER_ROLE.CUSTOMER;
};

export const isAdminSignedIn = () => {
  return localStorage.getItem("role") === USER_ROLE.ADMIN;
};
