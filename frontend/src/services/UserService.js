import axios from 'axios'

const USERS_REST_API_URL = "http://localhost:8080/api/v1/user";

class UserService {
    httpClient = axios.create({
        baseURL: "http://localhost:8080/api/v1/user"
    })
    getUsers() {
        return this.httpClient.get();
    }

    getUserById(id) {
        return this.getUserById.get("/" + id);
    }
  
    getUserJourneys(id){
        return this.httpClient.get("/" + id + "/journeys")
    }
  
    getUserOrders(id){
        return this.httpClient.get("/" + id + "/orders")
    }
    
}

export default new UserService();