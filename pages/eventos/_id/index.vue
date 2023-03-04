<template>
  <div>
    <Header />
    <BannerPage :beadcrumb="beadcrumbPage" :title="datos.titulo"></BannerPage>

    <!-- formatDateTitle(datos.fecha) -->
    <CulturaEvento2 :titulo="datos.titulo" :dia="formatDateTitle(datos.fecha)" :descripcion="datos.descripcion"
      :imagen="datos.imagen" :link_externo="datos.link" :fecha_desde="datos.fecha_desde"
      :fecha_hasta="datos.fecha_hasta" :actividad="datos.actividad" :mapa="datos.mapa" :link="datos.link"
      :espacio_id="datos.espacio_id" :espacio_nombre="datos.espacio_nombre" />
  </div>
</template>

<script>
import CulturaEvento2 from "@/components/cultura/CulturaEvento2.vue";
import BannerPage from "@/components/BannerPage.vue";
import Header from "@/components/Header";
import { mapGetters } from "vuex";

export default {
  components: { CulturaEvento2, Header, BannerPage },
  methods: {
    formatDate(string) {
      let base = string.slice(0, 10);
      let MAX = base.length;
      return (base.slice(MAX - 2, MAX) + "/" + base.slice(MAX - 5, MAX - 3) + "/" + base.slice(0, 4));
    },
    formatDateTitle(string) {
      string = String(string);
      return string.slice(0,8);
    }
  },
  data() {
    return {
      id: null,
      day_id: null,
      datos: {},
      evento: [],
      imagen: "https://tandil.gov.ar/_nuxt/img/logo_tandil.0c0f213.png",
      beadcrumbPage: [
        { path: "HOME", link: true },
        { path: "AGENDA", link: true },
        {
          currentPage: "Detalle de evento",
        },
      ],
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.day_id = this.$route.query.day_id;

    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 3000)
    })

    this.$store
      .dispatch("posts/getEvento", { 'id': this.id, 'day_id': this.day_id })
      .then((res) => {
        console.log(res);
        if (res != null) {
          this.evento = res;
          console.log(res);

          let aux_img = "";
          if (res.folleto[res.folleto.length - 1] != "/") {
            aux_img = res.folleto;
          } else aux_img = this.imagen;

          this.datos = {
            titulo: res.titulo,
            descripcion: res.descripcion,
            fecha_desde: this.formatDate(res.fecha_desde),
            fecha_hasta: this.formatDate(res.fecha_hasta),
            fecha: this.formatDate(res.fecha),
            link: res.link,
            actividad: res.desc_tarea,
            imagen: aux_img,
            mapa: res.mapa,
            espacio_id: res.espacio,
            espacio_nombre: res.espacio_nombre
          }
        }
      })
      .catch((error) => {
        if (error.status == 400) {
          console.log("no se encontró datos.");
        }
      });
  },

  computed: {
    ...mapGetters({
      getEvento: "posts/getEvento"
    })
  }
};
</script>
<style>
.cultura_text_color {
  color: #B14549 !important;
}
</style>