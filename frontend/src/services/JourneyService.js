import axios from 'axios'

const JOURNEY_REST_API_URL = "http://localhost:8080/api/v1/journey";
const JOURNEY_FILTER_API_URL = "http://localhost:8080/api/v1/journey/filter"

class JourneyService {

    getJourneys() {
        return axios.get(JOURNEY_REST_API_URL);
    }

    filterJourneys(dto) {
        return axios.post(JOURNEY_FILTER_API_URL, dto)
    }
}

export default new JourneyService();