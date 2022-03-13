import { createStore } from "vuex";
import axios from "axios";
import posts from "./modules/posts";
import auth from "./modules/auth";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

const store = createStore({
    modules: {
        posts,
        auth,
    },
});
export default store;
