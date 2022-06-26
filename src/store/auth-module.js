import AuthService from '../services/auth-service';
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };
export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        register({ commit }, user) {
            return AuthService.register(user).then(
                response => {
                    commit("registerSuccess");
                    return Promise.resolve(response.data);
                },
                error => {
                    commit("registerFailure");
                    return Promise.reject(error);
                }
            )
        },
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        delete({ commit }, user) {
            return AuthService.delete(user).then(
                () => {
                    commit('deleteSuccess');
                    return Promise.resolve();
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        update({ commit }, user) {
            return AuthService.update(user).then(
                response => {
                    commit('updateSuccess', user);
                    return Promise.resolve(response.data);
                },
                error => {
                    return Promise.reject(error);
                }
            )
        },
    },
    mutations: {
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        deleteSuccess(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        updateSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
    }
};