import CurrentUserUtils from "../components/utils/CurrentUserUtils";

const useCurrentUser = () => {
    return CurrentUserUtils.getCurrentUserId();
};

export default useCurrentUser;