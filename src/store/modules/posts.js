import axios from "axios";

const state = {
    posts: [],
    post: "",
};

const getters = {
    allPosts: (state) => state.posts,
};

const actions = {
    async fetchPosts({ commit }) {
        await axios.get(`posts?_page=1&_limit=5`).then((response) => {
            commit("setPosts", response.data);
        });
    },
    async fetchPostById({ commit }, { postId }) {
        await axios.get(`comments?postId=${postId}`).then((response) => {
            commit("detailPost", response.data);
        });
    },
    async fetchPostsAdmin({ commit }, { auth_id }) {
        const response = await axios.get(`posts?userId=${auth_id}`);
        commit("setPosts", response.data);
    },
    async addPost({ commit }, { userId, title, body }) {
        await axios
            .post("posts", {
                userId,
                title,
                body,
            })
            .then((response) => {
                commit("newPost", response.data);
            });
    },
    async deletePost({ commit }, deleteId) {
        await axios.delete(`/posts/${deleteId}`).then((response) => {
            console.log(response);
            commit("removePost", deleteId);
        });
    },
};

const mutations = {
    setPosts: (state, posts) => (state.posts = posts),
    detailPost: (state, post) => (state.post = post),
    newPost: (state, post) => state.posts.unshift(post),
    removePost: (state, id) =>
        (state.posts = state.posts.filter((post) => post.id !== id)),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
