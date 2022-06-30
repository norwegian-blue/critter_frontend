import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.NODE_ENV === "Production"
    ? "/api/creets/"
    : "http://localhost:8081/api/creets/";
class CreetService {
    postCreet(content) {
        return axios.post(API_URL, {
            content: content,
        });
    }
}
export default new CreetService();