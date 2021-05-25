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
  
    async getUserJourneys(id){
        return this.httpClient.get(`/${id}/journeys`);
     /*   const {data} = await this.httpClient.get(`/${id}/journeys`);
        return data.map((journey) => {
            journey.endTravelPoint.dispatchDate = new Date(journey.endTravelPoint.dispatchDate);
            journey.startTravelPoint.arrivalDate = new Date(journey.startTravelPoint.arrivalDate);
            return journey;
        })*/
         
    }
  
    getUserOrders(id){
        return this.httpClient.get(`/${id}/orders`);
    }
    userUpdate(user){
        return this.httpClient.post(`/update`,user)
    }
    getUserOtherOrders(id){
        return this.httpClient.get(`/${id}/request-orders`)
    }
    updateRating(id){
        return this.httpClient.post(`/${id}/rating-update`)
    }
    
}

export default new UserService();