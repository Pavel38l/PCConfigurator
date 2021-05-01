import axios from '../axiosDefault'



class JourneyService {
    httpClient = axios.create({
        baseURL: "http://localhost:8080/api/v1/journey",
    })
    getJourneys() {
        return this.httpClient.get();
    }

    getJourneysFull() {
        return this.httpClient.get("/full");
    }

    getJourney(id){
        return this.httpClient.get(`/${id}`)
    }

    filterJourneys(dto) {
        return this.httpClient.post("/filter", dto);
    }

    deleteJourney(id){
        return this.httpClient.delete(`/${id}`)
    }

    createJourney(dto) {
        return this.httpClient.post("/create", dto);
    }
}

export default new JourneyService();