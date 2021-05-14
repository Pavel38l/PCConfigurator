import jwtdecoder from "jwt-decode";

class CurrentUserUtils {
    getCurrentUserId() {
        return jwtdecoder(localStorage.getItem("token")).jti;
    }
}
export default new CurrentUserUtils();