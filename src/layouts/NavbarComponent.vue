<template>
    <q-header elevated>
        <q-toolbar>
            <q-btn flat round dense icon="menu" class="q-mr-sm" />
            <q-toolbar-title>POST APPS</q-toolbar-title>
            <q-btn flat round dense icon="favorite" />
            <q-btn-dropdown color="primary">
                <q-list>
                    <q-item
                        clickable
                        v-close-popup
                        @click="isModalsLogin = true"
                        v-if="!auth"
                    >
                        <q-item-section>
                            <q-item-label>Login</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="logout" v-if="auth">
                        <q-item-section>
                            <q-item-label>Logout</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-btn-dropdown>
        </q-toolbar>
    </q-header>

    <q-dialog v-model="isModalsLogin" persistent>
        <q-card style="min-width: 350px">
            <q-form
                @submit.prevent="login"
                @reset="onReset"
                class="q-gutter-md q-pa-md"
            >
                <q-input
                    dense
                    v-model="user_id"
                    label="Your ID *"
                    lazy-rules
                    :rules="[
                        (val) =>
                            (val && val.length > 0) || 'Please type your ID',
                    ]"
                />

                <q-input
                    dense
                    type="email"
                    v-model="email"
                    label="Your Email *"
                    lazy-rules
                    :rules="[
                        (val) =>
                            (val !== null && val !== '') ||
                            'Please type your Email',
                    ]"
                />

                <div>
                    <q-btn label="Login" type="submit" color="primary" />
                    <q-btn
                        label="Reset"
                        type="reset"
                        color="primary"
                        flat
                        class="q-ml-sm"
                    />
                </div>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    name: "NavbarComponent",
    setup() {
        const router = useRouter();
        const store = useStore();
        const isModalsLogin = ref(false);
        const user_id = ref("");
        const email = ref("");

        const auth = computed(() => store.getters.authData);

        const login = () => {
            store
                .dispatch("retrieveAuth", {
                    user_id: user_id.value,
                    email: email.value,
                })
                .then((res) => {
                    isModalsLogin.value = false;
                    router.push({ name: "admin" });
                });
        };

        const onReset = () => {
            user_id.value = null;
            email.value = null;
        };

        const logout = () => {
            store.dispatch("destroyAuth").then((res) => {
                router.push({ name: "posts" });
            });
        };

        return {
            isModalsLogin,
            login,
            onReset,
            logout,
            user_id,
            email,
            auth,
        };
    },
};
</script>
