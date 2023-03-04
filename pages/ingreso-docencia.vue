<template>
    <div>
        <Header />
        <BannerPage :beadcrumb="beadcrumbPage" :title="'Ingreso a la Docencia'"></BannerPage>
         <div class="container mt-5">
            <h5>Ingreso a la Docencia Municipal</h5>
            <p>Dirección de educación, Avenida Colón 1118 Te. 442 4357</p>
        </div>

    </div>
</template>
<script>

import Header from '@/components/Header.vue';
import Acordeon from '@/components/acordeon/Acordeon.vue';
import BannerPage from '@/components/BannerPage.vue';
// import { mapGetters } from 'vuex';
export default {
    components: { Header, Acordeon, BannerPage },
    head: {
        title: "Municipalidad de Tandil - Ingreso a la Docencia",
    },
    data() {
        return {
            beadcrumbPage: [
                { path: "HOME", link: true },
                {
                    currentPage: "Ingreso a la Docencia",
                },
            ],
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => this.$nuxt.$loading.finish(), 3000);
        })
    },
}
</script>