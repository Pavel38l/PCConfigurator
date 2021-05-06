import axios from '../axiosDefault'


class OrderService {
    httpClient = axios.create({
        baseURL: "http://localhost:8080/api/v1/orders",
    })
   
    deleteOrder(id) {
        return this.httpClient.delete(`/${id}`)
    }

    createOrder(dto) {
        return this.httpClient.post("", dto)
    }

    getOrdersSize() {
        return this.httpClient.get("/orderSizes")
    }
    acceptOrder(id){
        return this.httpClient.post(`/${id}/accept`)
    }
    cancelOrder(id){
        return this.httpClient.post(`/${id}/cancel`)
    }
}

export default new OrderService();