import { createRouter, createWebHistory } from "vue-router";
import PostsComponent from "../components/visitor/PostsComponent.vue";
import AdminComponent from "../components/admin/AdminComponent.vue";
import store from "../store";

const routes = [
    {
        path: "/",
        name: "posts",
        component: PostsComponent,
    },
    {
        path: "/admin",
        name: "admin",
        component: AdminComponent,
        meta: {
            requiresAuth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!store.getters.loggedIn) {
            next({
                name: "posts",
            });
        } else {
            next();
        }
    } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({
                name: "admin",
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
