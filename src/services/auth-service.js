import axios from "axios";
const API_URL = process.env.NODE_ENV === "production"
    ? "/api/auth/"
    : "http://localhost:8080/api/auth/";
class AuthService {
    register(user) {
        return axios.post(API_URL + 'signup', {
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
    delete() {
        return axios
            .post(API_URL + 'delete', {

            })
            .then(response => {
                localStorage.removeItem('user');
            });
    }
    update(user) {
        return axios
            .put(API_URL + 'signup', {
                username: user.username,
                password: user.password,
            })
            .then(response => {
                return response.data;
            });
    }
}
export default new AuthService();