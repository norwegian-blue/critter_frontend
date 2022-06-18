import axios from "axios";
const API_URL = process.env.NODE_ENV === "production"
    ? "/api/auth"
    : "http://localhost:8080/api/auth/";
class AuthService {
    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            password: user.password,
        });
    }
}
export default new AuthService();