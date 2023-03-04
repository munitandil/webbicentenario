<template>
    <div>
        <Header />
        <BannerPage :beadcrumb="beadcrumbPage" :title="'Listado de Jardines'"></BannerPage>
       
        <div class="container">
            <div class="col-12 my-5">
                <Acordeon :items="this.items" />
            </div>
        </div>
    </div>
</template>
<script>

import Header from '@/components/Header.vue';
import Acordeon from '@/components/acordeon/Acordeon.vue';
import BannerPage from '@/components/BannerPage.vue';
import { mapGetters } from 'vuex';
export default {
    components: { Header, Acordeon, BannerPage },
    head: {
        title: "Municipalidad de Tandil - Primera Infancia",
    },
    data() {
        return {
            beadcrumbPage: [
                { path: "HOME", link: true },
                {
                    currentPage: "Jardines",
                },
            ],
            items: [],
        }
    },
    methods: {
        formatData(data) {
            let jardines = [];

            data.forEach(jardin => {
                let aux = jardin;
                aux.ubicacion = jardin.calle + " " + jardin.puerta + ", " + jardin.localidad;

                jardines.push(aux);
            });

            return jardines;
        }
    },
    mounted() {

        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => this.$nuxt.$loading.finish(), 3000);
        });

        this.$store
            .dispatch("posts/getPrimerasInfancias")
            .then((res) => {
                this.items = this.formatData(this.getPrimerasInfancias);
            })
            .catch((error) => {
                this.$nuxt.error({
                    statusCode: 404,
                    message: "Ocurrio un error " + error
                });
            });
    },
    computed: {
        ...mapGetters({
            getPrimerasInfancias: "posts/getStoredPrimerasInfancias"
        })
    }
}
</script>