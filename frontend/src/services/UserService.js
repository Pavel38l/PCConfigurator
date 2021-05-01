import axios from '../axiosDefault'


class UserService {
    httpClient = axios.create({
        baseURL: "http://localhost:8080/api/v1/user",
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