import jwtdecoder from "jwt-decode";

const isCurentUser = (id) => {
  return localStorage.getItem("token") &&
    id === jwtdecoder(localStorage.getItem("token")).jti
    ? true
    : false;
};

export default isCurentUser;
