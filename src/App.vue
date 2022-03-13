<template>
    <div class="q-pa-md">
        <q-layout
            view="lHh lpr lFf"
            container
            style="height: 650px"
            class="shadow-2 rounded-borders"
        >
            <navbar-component />
            <footer-component />

            <router-view></router-view>
        </q-layout>
    </div>
</template>

<script>
import NavbarComponent from "./layouts/NavbarComponent.vue";
import FooterComponent from "./layouts/FooterComponent.vue";

export default {
    components: {
        NavbarComponent,
        FooterComponent,
    },
};
</script>
