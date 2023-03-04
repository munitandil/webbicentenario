<template>
    <div>
        <Header />
        <BannerPage :beadcrumb="beadcrumbPage" :title="'Espacios Culturales'"></BannerPage>
        <section>
            <div class="container">
                <div class="row">
                    <nuxt-link class="btn btn-outline-default rounded-0 btn-custom" to="/reserva-espacios">Reservar
                        espacio
                    </nuxt-link>
                    <a class="btn btn-outline-default rounded-0 btn-custom" target="_blank"
                        href="https://www.autogestion.tandil.gov.ar/apex/f?p=145:2:4117278150771:::::">Registrar espacio
                    </a>
                    <div class="col-lg-12">
                        <div class="row blog_thumbs">
                            <Card v-if="espacios.length > 0" v-for="data in espacios" :key="data.esp_id"
                                :title="data.esp_nombre" :description="data.esp_descripcion" :image="data.imagen"
                                :extra="data.esp_atencion" :phone="data.esp_telefono" :email="data.esp_email"
                                :ubication="data.calle + ' ' + data.esp_nro_puerta + ', ' + data.localidad"
                                :link="data.esp_link_loc" :id="data.esp_id" :type="data.tipo" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>

// Esto sería patrimonio cultural

import Header from '@/components/Header.vue';
import BannerPage from '@/components/BannerPage.vue';
import Card from '@/components/cultura/card/ListaCard.vue';
import { mapGetters } from 'vuex';

export default {
    components: { Header, BannerPage, Card },

    data() {
        return {
            beadcrumbPage: [
                { path: "HOME", link: true },
                {
                    currentPage: "Espacios Culturales",
                },
            ],
            espacios: []
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => this.$nuxt.$loading.finish(), 3000);
        });

        this.$store
            .dispatch("posts/getEspaciosCulturales")
            .then((res) => {
                console.log(res);
                this.espacios = this.getEspaciosCulturales;
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
            getEspaciosCulturales: "posts/getStoredEspaciosCulturales",
        }),
    }
}
</script>
<style>
.blog_meta a:hover {
    color: #B14549 !important;
}

.blog_title a:hover {
    color: #B14549 !important;
}
</style>