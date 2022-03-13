import axios from "axios";

const state = {
    auth: localStorage.getItem("auth") || null,
    page: "",
};

const getters = {
    authData: (state) => state.auth,
    loggedIn(state) {
        return state.auth != null;
    },
    pageName: (state) => state.page,
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
    setPage({ commit }, { name }) {
        console.log("Vuex Page Name", name);
        commit("setPage", name);
    },
};

const mutations = {
    retrieveAuth(state, auth) {
        state.auth = auth;
    },
    destroyAuth(state) {
        state.auth = null;
    },
    setPage(state, name) {
        state.page = name;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
