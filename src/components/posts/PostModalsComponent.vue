<template>
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
import { ref, computed } from "vue";

export default {
    name: "PostModalsComponent",
    props: ["isModals", "postsId"],
    setup(props) {
        const details = ref({});
        const isModals = computed(() => props.isModals);

        return {
            isModals,
            details,
        };
    },
};
</script>

<style lang="scss" scoped></style>
