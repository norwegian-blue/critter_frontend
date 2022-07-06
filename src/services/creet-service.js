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
    deleteCreet(creetId) {
        return axios.delete(`${API_URL}${creetId}`,
            {
                headers: authHeader()
            })
            .then()
            .catch(err => {
                console.log('Unexpected error');
                console.log(err);
            });
    }
    editCreet(creetId, content) {
        return axios.put(`${API_URL}${creetId}`,
            {
                content: content,
            },
            {
                headers: authHeader(),
            });
    }
    repostCreet(creetId, content) {
        return axios.post(`${API_URL}recreet/${creetId}`,
            {
                content: content,
            },
            {
                headers: authHeader(),
            });
    }
}
export default new CreetService();