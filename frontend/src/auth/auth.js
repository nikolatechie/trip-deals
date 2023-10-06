export const isUserSignedIn = () => {
  return localStorage.getItem("username") !== null;
};
