<template>
  <!-- START SECTION NOTICIAS -->
  <div  class="bg_azul_act text-white">
  <section class="small_pt small_pb col-md-12" v-if="getPostsHomeAct.length !== 0">
    <div class="dsi-container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section_featured">
            <p class="heading_azul_act">
                 Agenda 
            </p>
            <div class="tab-content tab_content_slider">
              <div
                class="tab-pane fade active show"
                id="politics"
                role="tabpanel"
                aria-labelledby="politics-tab"
              >
                <div class="row">               
                  <div class="col-md-12 rounded-5">
                    <ul class="blog_small_post blog_grid list_none">
                      <li
                        class="col-md-4 text-white   mb-5"
                        v-for="item in getPostsHomeAct"
                        :key="item.id"
                      >
                        <CardDestacada
                          :pId="item.id"
                          :pTitulo="item.titulo"
                          :pBajada="item.bajada"
                          :pImagen="item.imagen" 
                          :pDia="item.dia"
                          :pMes="item.mes"
                        />
                      </li>
                    </ul>
                   <!-- <div class="border-top border-bottom py-2 mt-4 text-center"> -->
                    <div class="  py-2 mt-4 text-center"> 
                    <!--  <DSILink
                        pPath="ACTIVIDADES"
                        pTipoLink="I"
                        pCustomLabel="Ver másiii"
                        pClass="btn btn-outline-primary"
                      /> -->
                      <!--  <NuxtLink to="/novedades" class="btn btn-outline-primary" >
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
import CardMiniImportant from "@/components/actividades/cardMiniImportant.vue";
import CardDestacada from "@/components/actividades/cardDestacadaAc.vue";
import DSILink from "@/components/DSILink";
import CardMini from "./cardMini.vue";
import { mapGetters } from "vuex";

export default {
  components: { CardMiniImportant, CardMini, DSILink, CardDestacada },
  computed: {
    ...mapGetters({
      getPostsHomeAct: "posts/getPostsHomeAct",
    }),
  },
};
</script>
<style>
.bg_azul_act {
    background-color:#f2f3f5 !important;
    color: rgb(0, 0, 0) !important;
    /*margin-bottom: 20px;*/
    padding-bottom: 30px;
    
}
.heading_azul_act {
    color:	rgb(26, 66, 139) !important;
    text-align: center;
    text-transform:uppercase;
    font-family:Helvetica;
    font-weight: 1000;
    font-size: 25pt;
}
 
</style>
