<template>
    <div>
        <Header />
        <BannerPage :beadcrumb="beadcrumbPage" :title="'Legislación de Cultura y Educación'"></BannerPage>

        <div class="container my-5">
            <div class="heading_s3">
                <h5>Legislación Cultura:</h5>
            </div>
            <ul class="list-group cul-list">

                <li v-for="legislacion in legislacionesCultura" :key="legislacion.id"
                    class="list-group-item d-flex justify-content-between align-items-center">
                    {{ legislacion.titulo }}
                    <a class="text-black" target="_blank" :href="legislacion.archivo" download>
                        <button class="btn btn-outline-primary">
                            Descargar
                        </button>
                    </a>
                </li>
            </ul>
        </div>

        <div class="container my-5">
            <!-- <div class="col-md-3 mb-4"> -->
            <div class="heading_s3">
            <h5>Legislación Educación:</h5> 
            </div>
            <ul class="list-group cul-list">
                <li v-for="legislacion in legislacionesEducacion" :key="legislacion.id"
                    class="list-group-item d-flex justify-content-between align-items-center">
                    {{ legislacion.titulo }}
                    <a class="text-black" target="_blank" :href="legislacion.archivo" download>
                        <button class="btn btn-outline-primary">
                            Descargar
                        </button>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Header from '@/components/Header.vue';
import BannerPage from '@/components/BannerPage.vue';
// import { mapGetters } from 'vuex';

export default {
    components: { Header, BannerPage },
    head: {
        title: "Cultura Municipalidad de Tandil - Legislaciones",
        meta: [
            {
                hid: "description",
                name: "description",
                content: "Listados de Normativas ",
            },
        ],
    },
    data() {
        return {
            beadcrumbPage: [
                { path: "HOME", link: true },
                {
                    currentPage: "Legislaciones",
                },
            ],
            legislacionesCultura: [],
            legislacionesEducacion: []
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => this.$nuxt.$loading.finish(), 3000);
        });

        this.$store
            .dispatch("posts/getLegislacionesCultura")
            .then((res) => {
                console.log(res);
                this.legislacionesCultura = res;
            })
            .catch((error) => {
                this.$nuxt.error({
                    statusCode: 404,
                    message: "Ocurrio un error " + error
                });
            });

        this.$store
            .dispatch("posts/getLegislacionesEducacion")
            .then((res) => {
                console.log(res);
                this.legislacionesEducacion = res;
            })
            .catch((error) => {
                this.$nuxt.error({
                    statusCode: 404,
                    message: "Ocurrio un error " + error
                });
            });
    },
}
</script>
<style>
.cul-list li button {
    border-color: #B14549 !important;
    color: black !important;
}

.cul-list li button:hover {
    background-color: #B14549 !important;
}

.cul-list li a button:hover {
    color: white !important;
}
</style>