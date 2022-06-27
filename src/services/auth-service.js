import axios from "axios";
import authHeader from "./auth-header";
const API_URL = process.env.NODE_ENV === "production"
    ? "/api/auth/"
    : "http://localhost:8080/api/auth/";
class AuthService {
    register(user) {
        return axios.post(API_URL + 'user', {
            username: user.username,
            password: user.password,
        });
    }
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password,
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    delete(userId) {
        return axios
            .delete(`${API_URL}user/${userId}`, {
                headers: authHeader(),
            })
            .then(() => {
                localStorage.removeItem('user');
            });
    }
    update(user, userId) {
        return axios
            .put(`${API_URL}user/${userId}`, 
                {
                    username: user.username,
                    password: user.password,
                },
                {
                    headers: authHeader(),
                }
            )
            .then(response => {
                return response.data;
            });
    }
}
export default new AuthService();