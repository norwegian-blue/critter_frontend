import api from "./api";
import authHeader from "./auth-header";
const API_URL = process.env.NODE_ENV === "production"
    ? "/api/auth/"
    : "http://localhost:8080/api/auth/";
class AuthService {
    register(user) {
        return api.post(API_URL + 'user', {
            username: user.username,
            password: user.password,
        });
    }
    login(user) {
        return api
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
        return api
            .delete(`${API_URL}user/${userId}`, {
                headers: authHeader(),
            })
            .then(() => {
                localStorage.removeItem('user');
            });
    }
    update(user, userId) {
        return api
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
                const localData = JSON.parse(localStorage.getItem('user'));
                localData["username"] = response.data.username;
                localStorage.setItem('user', JSON.stringify(localData));
                return response.data;
            });
    }
    getUsers() {
        return api.get(`${API_URL}user`,
            {
                headers: authHeader(),
            });
    }
}
export default new AuthService();