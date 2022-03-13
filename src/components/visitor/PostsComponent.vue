<template>
    <q-page-container>
        <q-page class="q-pa-md">
            <q-infinite-scroll @load="onLoad" :offset="250">
                <q-list>
                    <q-item
                        clickable
                        v-ripple
                        v-for="(item, index) in items"
                        :key="index"
                        @click="showModals(item.id)"
                    >
                        <q-item-section>
                            <q-item-label>{{ item.title }}</q-item-label>
                            <q-item-label caption lines="2">{{
                                item.body
                            }}</q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                            <q-icon name="favorite" color="yellow" />
                        </q-item-section>
                    </q-item>
                </q-list>

                <q-separator spaced inset />

                <template v-slot:loading>
                    <div class="row justify-center q-my-md">
                        <q-spinner-dots color="primary" size="40px" />
                    </div>
                </template>
            </q-infinite-scroll>
        </q-page>
    </q-page-container>

    <q-dialog v-model="isModals">
        <q-card>
            <div class="text-h5 q-pa-md">Comments</div>
            <div v-for="(detail, index) in details" :key="index">
                <q-card-section>
                    <div class="text-h6">{{ detail.name }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    {{ detail.body }}
                </q-card-section>
            </div>

            <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
    name: "PostsComponent",
    setup() {
        const store = useStore();
        const numPage = ref(0);
        const isModals = ref(false);
        const details = ref({});
        const nextPage = ref([]);

        onMounted(() => {
            store.dispatch("fetchPosts");
        });

        const auth = computed(() => store.getters.authData);
        const items = computed(() => store.getters.allPosts);

        const onLoad = (index, done) => {
            axios
                .get(
                    `https://jsonplaceholder.typicode.com/posts?_page=${numPage.value++}&_limit=5`
                )
                .then((res) => {
                    nextPage.value = res.data;
                });

            setTimeout(() => {
                items.value.push(
                    nextPage.value[0],
                    nextPage.value[1],
                    nextPage.value[2],
                    nextPage.value[3],
                    nextPage.value[4]
                );
                done();
            }, 2000);
        };

        const showModals = (postsId) => {
            isModals.value = true;
            axios
                .get(
                    `https://jsonplaceholder.typicode.com/comments?postId=${postsId}`
                )
                .then((res) => {
                    details.value = res.data;
                });
        };

        return {
            items,
            numPage,
            onLoad,
            showModals,
            isModals,
            details,
            auth,
        };
    },
};
</script>
