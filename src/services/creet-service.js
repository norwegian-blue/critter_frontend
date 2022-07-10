import api from "./api";
import authHeader from './auth-header';
const API_URL = process.env.NODE_ENV === "Production"
    ? "/api/creets"
    : "http://localhost:8080/api/creets";
class CreetService {
    postCreet(content) {
        return api.post(API_URL + '/',
            {
                content: content,
            },
            {
                headers: authHeader(),
            });
    }
    getFeed(page, size) {
        return api.get(`${API_URL}?page=${page}&size=${size}`, 
            {
                headers: authHeader()
            });
    }
    deleteCreet(creetId) {
        return api.delete(`${API_URL}/${creetId}`,
            {
                headers: authHeader()
            });
    }
    editCreet(creetId, content) {
        return api.put(`${API_URL}/${creetId}`,
            {
                content: content,
            },
            {
                headers: authHeader(),
            });
    }
    repostCreet(creetId, content) {
        return api.post(`${API_URL}/recreet/${creetId}`,
            {
                content: content,
            },
            {
                headers: authHeader(),
            });
    }
    upvoteCreet(creetId) {
        return api.post(`${API_URL}/upvote/${creetId}`, {},
            {
                headers: authHeader(),
            });
    }
}
export default new CreetService();