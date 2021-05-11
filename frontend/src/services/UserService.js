import axios from '../axiosDefault'
import {BACKEND_URL} from "../constants";


class UserService {
    httpClient = axios.create({
        baseURL: `${BACKEND_URL}/api/v1/user`,
    })
    getUsers() {
        return this.httpClient.get();
    }

    getUserById(id) {
        return this.httpClient.get(`/${id}`);
    }
  
    getUserJourneys(id){
        return this.httpClient.get(`/${id}/journeys`);
    }
  
    getUserOrders(id){
        return this.httpClient.get(`/${id}/orders`);
    }
    userUpdate(user){
        return this.httpClient.post(`/update`,user)
    }
    
}

export default new UserService();