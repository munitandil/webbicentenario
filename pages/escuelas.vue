<template>
    <div>
        <Header />
        <BannerPage :beadcrumb="beadcrumbPage" :title="'Listado de Escuelas'"></BannerPage>

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
        title: "Municipalidad de Tandil - Escuelas",
    },
    methods: {
        formatData(data) {
            let escuelas = [];

            data.forEach(escuela => {
                let aux = escuela;
                aux.ubicacion = escuela.calle + " " + escuela.puerta + ", " + escuela.localidad;

                escuelas.push(aux);
            });

            return escuelas;
        }
    },
    data() {
        return {
            beadcrumbPage: [
                { path: "HOME", link: true },
                {
                    currentPage: "Escuelas",
                },
            ],
            items: []
        }
    },
    mounted() {

        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => this.$nuxt.$loading.finish(), 3000);
        });


        this.$store
            .dispatch("posts/getEscuelas")
            .then((res) => {
                this.items = this.formatData(this.getEscuelas);
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
            getEscuelas: "posts/getEscuelas",
        }),
    }
}
</script>