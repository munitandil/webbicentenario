<template>
    <div>
        <Header />
        <BannerPage :beadcrumb="beadcrumbPage" :title="'Listado de bibliotecas'"></BannerPage>
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
        title: "Municipalidad de Tandil - Bibliotecas",
    },
    methods: {
        formatData(data) {
            let elementos = [];
            console.log(data);
            data.forEach(elem => {
                let aux = elem;
                aux.ubicacion = elem.calle + " " + elem.puerta + ", " + elem.localidad;
                elementos.push(aux);
            });
            console.log(elementos);
            return elementos;
        }
    },
    data() {
        return {
            beadcrumbPage: [
                { path: "HOME", link: true },
                {
                    currentPage: "Bibliotecas",
                },
            ],
            items: [],
        }
    },
    mounted() {

        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => this.$nuxt.$loading.finish(), 3000);
        });

        this.$store
            .dispatch("posts/getBibliotecas")
            .then((res) => {
                this.items = this.formatData(this.getBibliotecas);
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
            getBibliotecas: "posts/getStoredBibliotecas"
        })
    }
}
</script>