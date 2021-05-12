import jwtdecoder from "jwt-decode";

const isCurentUser = (id) => {
  if (
    localStorage.getItem("token") &&
    id === jwtdecoder(localStorage.getItem("token")).jti
  ) {
    return true;
  } else {
    return false;
  }
};

export default isCurentUser;
