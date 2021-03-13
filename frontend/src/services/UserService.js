import axios from 'axios'

const USERS_REST_API_URL = "http://localhost:8080/api/v1/user";

class UserService {

    getUsers() {
        return axios.get(USERS_REST_API_URL);
    }

    getUserById(id) {
        return axios.get(USERS_REST_API_URL + "/" + id);
    }
}

export default new UserService();