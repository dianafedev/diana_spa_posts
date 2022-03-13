import axios from "axios";

const state = {
    auth: localStorage.getItem("auth") || null,
};

const getters = {
    authData: (state) => state.auth,
    loggedIn(state) {
        return state.auth != null;
    },
};

const actions = {
    async retrieveAuth({ commit }, { user_id, email }) {
        await axios
            .get(`users/${user_id}`)
            .then((response) => {
                const auth = response.data.id;
                localStorage.setItem("auth", auth);
                commit("retrieveAuth", auth);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    destroyAuth({ commit }) {
        localStorage.removeItem("auth");
        commit("destroyAuth");
    },
};

const mutations = {
    retrieveAuth(state, auth) {
        state.auth = auth;
    },
    destroyAuth(state) {
        state.auth = null;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
