<template>
    <q-page-container>
        <PostListComponent :auth="auth" :items="items" />
    </q-page-container>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";
import PostListComponent from "../posts/PostListComponent.vue";

export default {
    name: "VisitorComponent",
    components: {
        PostListComponent,
    },
    setup() {
        const store = useStore();
        const route = useRoute();

        onMounted(() => {
            store.dispatch("fetchPosts");
            store.dispatch("setPage", {
                name: route.name,
            });
        });

        const auth = computed(() => store.getters.authData);
        const items = computed(() => store.getters.allPosts);

        return {
            auth,
            items,
        };
    },
};
</script>
