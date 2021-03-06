import axios from '../axiosDefault'
import {BACKEND_URL} from "../constants";


class OrderService {
    httpClient = axios.create({
        baseURL: `${BACKEND_URL}/api/v1/orders`,
    })
   
    deleteOrder(id) {
        return this.httpClient.delete(`/${id}`)
    }

    createOrder(dto) {
        return this.httpClient.post("", dto)
    }

    getAllJourneyOrders(journeyId) {
        return this.httpClient.get(`/journey/${journeyId}`);
    }

    getOrdersSize() {
        return this.httpClient.get("/orderSizes")
    }

    acceptOrder(id) {
        return this.httpClient.post(`/${id}/accept`)
    }

    cancelOrder(id) {
        return this.httpClient.post(`/${id}/cancel`)
    }

    prepareDelivery(prepareDeliveryDto) {
        return this.httpClient.post("/prepare-delivery", prepareDeliveryDto)
    }

    deliver(deliverDto) {
        return this.httpClient.post("/deliver", deliverDto)
    }

    rateJourney(id, value){
        return this.httpClient.post(`/${id}/rate-journey/${value}`)
    }

    rateOrder(id, value){
        return this.httpClient.post(`/${id}/rate-order/${value}`)
    }

    getJourneyOwnerId(idJourney){
        return this.httpClient.get(`/${idJourney}/journey-owner`)
    }

}

export default new OrderService();