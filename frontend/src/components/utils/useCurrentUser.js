import jwtdecoder from "jwt-decode";

const useCurrentUser = () => {
    if (localStorage.getItem("token")) {
        return jwtdecoder(localStorage.getItem("token")).jti;
    } else {
        return null;
    }
};

export default useCurrentUser;