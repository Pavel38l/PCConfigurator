import useCurrentUser from "./useCurrentUser";
import {PROFILE_URL} from "../../constants";

const useCurrentUserProfileUrl = () => {
    const userId = useCurrentUser();
    return `${PROFILE_URL}/${userId}`;

}

export default useCurrentUserProfileUrl;