<template>
    <div>
        <Header />
        <BannerPage :beadcrumb="beadcrumbPage" title="Detalle Espacio Cultural" />
        <CulturaEspacio :nombre="this.espacio.nombre" :ubicacion="this.espacio.ubicacion" :imagen="this.espacio.imagen"
            :descripcion="this.espacio.descripcion" :email="this.espacio.email" :telefono="this.espacio.telefono"
            :ubilink="this.espacio.ubilink" :atencion="this.espacio.atencion" :id="this.espacio.id" />
    </div>
</template>
<script>
import CulturaEspacio from "@/components/cultura/CulturaEspacio.vue";
import BannerPage from "@/components/BannerPage.vue";
import Header from "@/components/Header";
// import { mapGetters } from "vuex";

export default {
    components: { Header, BannerPage, CulturaEspacio },
    data() {
        return {
            beadcrumbPage: [
                { path: "HOME", link: true },
                {
                    currentPage: "Detalle del espacio cultural",
                },
            ],
            espacio: {},
            id: null
        }
    },
    mounted() {
        this.id = this.$route.params.id;

        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            setTimeout(() => this.$nuxt.$loading.finish(), 3000)
        })

        this.$store
            .dispatch("posts/getEspacioCultural", { 'id': this.id })
            .then((res) => {
                if (res != null) {
                    this.espacio = {
                        id: this.id,
                        nombre: res.esp_nombre,
                        ubicacion: res.calle + " " + res.esp_nro_puerta + ", " + res.localidad,
                        ubilink: res.esp_link_loc,
                        imagen: res.imagen,
                        email: res.esp_email,
                        telefono: res.esp_telefono,
                        descripcion: res.esp_descripcion,
                        atencion: res.esp_atencion
                    }
                }
            })
            .catch((error) => {
                if (error.status == 400) {
                    console.log("no se encontró datos.");
                }
            });
    },
};
</script>
<style>
.btn-custom {
    border-color: #B14549 !important;
}

.btn-custom:hover {
    background-color: #B14549 !important;
    color: white !important;
}

.sub-title-custom {
    color: #B14549 !important;
}
</style>