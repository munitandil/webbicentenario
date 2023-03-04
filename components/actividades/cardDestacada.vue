<template>
  <div class="blog_post blog_style11 ">
    <div class="blog_img">
      <DSILink
        pCustomLabel=" "
        :pCustomLink="'/actividades/' + pId"
        pTipoLink="I"
        pTitle="Imagen preview de la novedad"
      >
        <img :src="pImagen" alt="blog_small_img1_350X198" />
      </DSILink>
      <div class="blog_postcontent" v-if="pTags && pTags.length !== 0">
        <div class="blog_tags">
          <DSILink
            v-for="item in pTags.split('|#|').slice(0, 2)"
            pCustomLabel=" "
            :pCustomLink="'/tag?tipo=ACTIVIDADES&tag=' + item"
            pTipoLink="I"
            :key="item"
            :pTitle="item"
            pClass="blog_tags_cat blog_bg_dsi_color"
          >
            {{ item }}
          </DSILink>
        </div>
      </div>
    </div>
  <!--  <div class="blog_content bg-white "> -->
    <div class="blog_content  bg-blue text-white">
      <div class="blog_text text-white">
        <h6 class="blog_title text-white">
          <DSILink
            pCustomLabel=" "
            :pCustomLink="'/actividades/' + pId"
            pTipoLink="I"
            :pTitle="pTitulo"
          >
            {{ pTitulo }}
          </DSILink>
        </h6>
        <p>
          {{ pBajada }}
        </p>
      </div>
      <DSILink
          pCustomLabel=" "
          :pCustomLink="'/actividades/' + pId"
          pTipoLink="I"
          pClass="fa-solid fa-circle-plus"
          pTitle="Más detalle de la novedad"
        >
           más detalle <i class="ti-angle-double-right align-middle"></i>
          más detalle2 <!-- <a ref="@/assets/images/ICON_vermas_celeste.png"></a>-->
         
            </DSILink>
          
    </div>
  </div>
</template>
<script>
import DSILink from "@/components/DSILink";
export default {
  components: { DSILink },
  props: ["pId", "pTitulo", "pBajada", "pImagen","pTags"],
};
</script>
<style>
.blog_style11 {
    padding: 0px;
    box-shadow: 0 0 5px rgb(0 0 0 / 20%);
    background-color: #1a428b;
    border-radius: 15px;
    color:white !important;
}</style>