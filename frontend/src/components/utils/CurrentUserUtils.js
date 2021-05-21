import jwtdecoder from "jwt-decode";

class CurrentUserUtils {
    getCurrentUserId() {
        if(localStorage.getItem("token"))
            return jwtdecoder(localStorage.getItem("token")).jti;
        else
            return "";
    }
}
export default new CurrentUserUtils();