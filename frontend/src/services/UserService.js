import axios from 'axios'



class UserService {
    httpClient = axios.create({
        baseURL: "http://localhost:8080/api/v1/user"
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
    
}

export default new UserService();