<template>
  <div>
    <Header /> 
   <!-- <BannerPage :beadcrumb="beadcrumbPage" :title="'Novedades Del Bicentenario'"></BannerPage> -->
    <section  class="fond_azul">
      <div class="container ">
     <!--  <div class="">
          <label>Filtrar novedades:</label>
          
        </div> -->
        <div class="row">
          <div class="col-lg-9">
            <div class="animation" data-animation="fadeInUp " data-animation-delay="0.1s">
              <paginate name="listPosts" :list="listPosts" :per="10" class="dsi-list-post row" v-if="listPosts.length">
                <li class="col-lg-6 col-md-6 mb-md-6 mb-2 pb-2" v-for="item in paginated('listPosts')" :key="item.id">
                  <CardDestacada :pId="item.id" :pTitulo="item.titulo" :pBajada="item.bajada" :pImagen="item.imagen"
                    :pTags="item.l_tag" />
                </li>
              </paginate>
              <div class="col-12 mt-4">
                <paginate-links :show-step-links="true" :hide-single-page="true" :limit="4" for="listPosts" :classes="{
                  ul: ['pagination', 'justify-content-center'],
                  li: 'page-item',
                  a: 'page-link',
                }" v-if="listPosts.length"></paginate-links>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Sidebar from "@/components/actividades/sidebarPost.vue";
import BannerPage from "@/components/BannerPage.vue";
import CardDestacada from "@/components/actividades/cardDestacada.vue";
import Header from "@/components/Header";
import { mapGetters } from "vuex";
export default {
  components: { Sidebar, BannerPage, CardDestacada, Header },
  head: {
    title: "Municipalidad de Tandil - Novedades del Bicentenario",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Listados de actividades del Bicentenario de Tandil",
      },
    ],
  },
  created() {
    this.f_loadPosts();
  },
  mounted() {
    //muestro el cargando cuando entro a la pagina (cuadrados azules)
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 3000);
    });
  },
  computed: {
    ...mapGetters({
      getAllPosts: "posts/getAllPostAct",
    }),
  },
  data() {
    return {
      listPosts: [],
      paginate: ["listPosts"],
      beadcrumbPage: [
        { path: "HOME", link: true },
        {
          currentPage: "Actividades",
        },
      ],
    };
  },
  methods: {
    f_loadPosts: function () {
      this.$store
        .dispatch("posts/getAllPostAct")
        .then((res) => {
          this.listPosts = this.getAllPostsAct;
        })
        .catch((error) => {
          this.$nuxt.error({
            statusCode: 404,
            message:
              "Ocurrio un error al cargar la lista de todos los post " +
              ". Error: " +
              error,
          });
        });
    },
  },
};
</script>
<style>
/* Clases necesarias para cambiarle el color al carousel */
.fond_azul {
  background-color: #1A428B !important;
  border-color: #1A428B !important; 
}
.carousel-btn {
  background-color: #1A428B !important;
  border-color: #1A428B !important;
}
</style>

