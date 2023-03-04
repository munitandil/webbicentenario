<template>
    <div>
        <Header />
        <BannerPage :beadcrumb="beadcrumbPage" :title="'Talleres Municipales'"></BannerPage>
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
        title: "Municipalidad de Tandil - Talleres Municipales",
    },
    methods: {
        formatData(data) {
            let elementos = [];
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
                    currentPage: "Talleres Municipales",
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
            .dispatch("posts/getTalleresMunicipales")
            .then((res) => {
                this.items = this.formatData(this.getTalleres);
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
            getTalleres: "posts/getTalleres"
        })
    }
}
</script>