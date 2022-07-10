import axiosInstance from "./api";
const setup = (store) => {
    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            if (err.response && 
                 err.response.status === 401 && 
                 err.response.data.message === "Unauthorized!") {
                store.dispatch('auth/logout');
            }
            return Promise.reject(err);
        }
    );
};
export default setup;