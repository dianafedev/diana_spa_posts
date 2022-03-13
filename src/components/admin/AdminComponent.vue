<template>
    <q-page-container>
        <q-page class="q-pa-lg">
            <q-btn
                label="Add Post"
                color="primary"
                @click="isModalsAdd = true"
            />
            <q-infinite-scroll @load="onLoad" :offset="250">
                <q-list>
                    <q-item
                        clickable
                        v-ripple
                        v-for="(item, index) in items"
                        :key="index"
                    >
                        <q-item-section @click="showModals(item.id)">
                            <q-item-label>{{ item.title }}</q-item-label>
                            <q-item-label caption lines="2">{{
                                item.body
                            }}</q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                            <q-icon name="star" color="yellow" />
                        </q-item-section>
                        <q-item-section side top>
                            <q-icon
                                name="delete"
                                color="red"
                                @click="showDeletePost(item.id)"
                            />
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

    <q-dialog v-model="isModalsAdd" persistent>
        <q-card style="min-width: 350px">
            <form @submit.prevent="addPost">
                <div class="text-h5 q-pa-md">Create Post</div>
                <q-card-section>
                    <div class="text-h6">Title</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <q-input dense v-model="title" autofocus />
                </q-card-section>

                <q-card-section>
                    <div class="text-h6">Body</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <q-input dense v-model="body" autofocus />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="Save" type="submit" />
                </q-card-actions>
            </form>
        </q-card>
    </q-dialog>

    <q-dialog v-model="isModalsDelete" persistent>
        <q-card style="min-width: 350px">
            <form @submit.prevent="deletePost">
                <q-card-section class="row items-center">
                    <q-avatar icon="delete" color="red" text-color="white" />
                    <span class="q-ml-sm">Delete Data Post ?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Delete" color="primary" type="submit" />
                </q-card-actions>
            </form>
        </q-card>
    </q-dialog>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
    name: "AdminComponent",
    setup() {
        const store = useStore();
        const numPage = ref(0);
        const isModals = ref(false);
        const isModalsAdd = ref(false);
        const isModalsDelete = ref(false);
        const details = ref({});
        const nextPage = ref([]);
        const title = ref([]);
        const body = ref([]);
        const deleteId = ref([]);

        onMounted(() => {
            store.dispatch("fetchPostsAdmin", {
                auth_id: auth.value,
            });
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

        const addPost = () => {
            store
                .dispatch("addPost", {
                    userId: auth.value,
                    title: title.value,
                    body: body.value,
                })
                .then((response) => {
                    isModalsAdd.value = false;
                });
        };

        const showDeletePost = (postId) => {
            isModalsDelete.value = true;
            deleteId.value = postId;
        };

        const deletePost = () => {
            store
                .dispatch("deletePost", {
                    deleteId: deleteId.value,
                })
                .then((res) => {
                    console.log(res);
                    isModalsDelete.value = false;
                });
        };

        return {
            auth,
            items,
            numPage,
            onLoad,
            showModals,
            isModals,
            isModalsAdd,
            isModalsDelete,
            details,
            title,
            body,
            addPost,
            showDeletePost,
            deletePost,
        };
    },
};
</script>
