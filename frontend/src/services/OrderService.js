import axios from 'axios'



class OrderService {
    httpClient = axios.create({
        baseURL: "http://localhost:8080/api/v1/orders"
    })
   
    deleteOrder(id){
        return this.httpClient.delete(`/${id}`)
    } 
    
}

export default new OrderService();