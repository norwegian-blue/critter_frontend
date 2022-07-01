import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.NODE_ENV === "Production"
    ? "/api/creets/"
    : "http://localhost:8080/api/creets/";
class CreetService {
    postCreet(content) {
        return axios.post(API_URL, 
            {
                content: content,
            },
            {
                headers: authHeader(),
            });
    }
    getFeed() {
        return axios.get(API_URL, 
            {
                headers: authHeader()
            });
    }
}
export default new CreetService();