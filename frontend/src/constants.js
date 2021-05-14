import CurrentUserUtils from "./components/utils/CurrentUserUtils";
import useCurrentUser from "./hooks/useCurrentUser";

export const BACKEND_URL = process.env.REACT_APP_BACKEND;
export const PROFILE_URL = `/profile/${CurrentUserUtils.getCurrentUserId()}`;