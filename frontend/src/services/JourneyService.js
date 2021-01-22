import axios from 'axios'

const JOURNEY_REST_API_URL = "http://localhost:8080/api/v1/journey";

class JourneyService {

    getJourneys() {
        return axios.get(JOURNEY_REST_API_URL);
    }
}

export default new JourneyService();