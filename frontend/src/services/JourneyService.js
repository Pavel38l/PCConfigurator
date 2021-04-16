import axios from 'axios'



class JourneyService {
    httpClient = axios.create({
        baseURL: "http://localhost:8080/api/v1/journey"
    })
    getJourneys() {
        return this.httpClient.get();
    }

    filterJourneys(dto) {
        return this.httpClient.post("/filter", dto);
    }

    deleteJourney(id){
        return this.httpClient.delete(`/${id}`)
    }

    createJourney(dto) {
        return axios.post(JOURNEY_REST_API_URL + '/create', dto)
    }
}

export default new JourneyService();