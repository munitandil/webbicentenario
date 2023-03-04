<template>
    <div>
        <Header />
        <BannerPage :beadcrumb="beadcrumbPage" :title="'Listado de Elencos'"></BannerPage>
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
        title: "Municipalidad de Tandil - Elencos",
    },
    methods: {
        formatData(data) {
            let elencos = [];

            data.forEach(elenco => {
                let aux = elenco;
                aux.ubicacion = elenco.calle + " " + elenco.puerta + ", " + elenco.localidad;

                elencos.push(aux);
            });

            return elencos;
        }
    },
    data() {
        return {
            beadcrumbPage: [
                { path: "HOME", link: true },
                {
                    currentPage: "Elencos",
                },
            ],
            items: []
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => this.$nuxt.$loading.finish(), 3000);
        })
        this.$store
            .dispatch("posts/getAllElencos")
            .then((res) => {
                this.items = this.formatData(res);
            })
            .catch((error) => {
                console.log(error);
                // this.$nuxt.error({
                //     statusCode: 404,
                //     message: "Ocurrio un error " + error
                // });
            });
    },
    computed: {
        ...mapGetters({
            getElencos: "posts/getElencos",
        }),
    }
}
</script>