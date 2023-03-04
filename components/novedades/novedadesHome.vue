<template>
  <!-- START SECTION NOTICIAS -->
  <div  class="bg_azul">
  <section class="small_pt small_pb col-md-12" v-if="getPostsHome.length !== 0">
    <div class="dsi-container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section_featured">
            <p class="heading_azul">
               Ultimas Noticias y Actividades 
            </p>
            <div class="tab-content tab_content_slider">
              <div
                class="tab-pane fade active show"
                id="politics"
                role="tabpanel"
                aria-labelledby="politics-tab"
              >
                <div class="row">               
                  <div class="col-md-12">
                    <ul class="blog_small_post blog_grid list_none">
                      <li
                        class="col-md-4"
                        v-for="item in getPostsHome"
                        :key="item.id"
                      >
                        <CardDestacada
                          :pId="item.id"
                          :pTitulo="item.titulo"
                          :pBajada="item.bajada"
                          :pImagen="item.imagen"                          
                        />
                      </li>
                    </ul>
                   <!-- <div class="border-top border-bottom py-2 mt-4 text-center"> -->
                    <br><br>
                    <br><br>
                    <div class=" py-2 mt-4 text-center margin-top=5px"> 
                      <DSILink
                        pPath="NOVEDADES"
                        pTipoLink="I"
                        pCustomLabel="Ver más"
                        pClass="btn btn-outline-primary"
                      />
                      <!--  <NuxtLink to="/" class="btn btn-outline-primary" >
                                Ver todas
                        </NuxtLink>  -->
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
  <!-- END SECTION NOTICIAS -->
</template>

<script>
import CardMiniImportant from "@/components/novedades/cardMiniImportant.vue";
import CardDestacada from "@/components/novedades/cardDestacada.vue";
import DSILink from "@/components/DSILink";
import CardMini from "./cardMini.vue";
import { mapGetters } from "vuex";

export default {
  components: { CardMiniImportant, CardMini, DSILink, CardDestacada },
  computed: {
    ...mapGetters({
      getPostsHome: "posts/getPostsHome",
    }),
  },
};
</script>
<style>
.bg_azul {
    background-color:#1a428b !important;
    color: white !important;
    
}
.heading_azul {
    color:	white !important;
    text-align: center;
    text-transform:uppercase;
    font-family:Helvetica;
    font-weight:bold;
    font-size: 25pt;
}
</style>
