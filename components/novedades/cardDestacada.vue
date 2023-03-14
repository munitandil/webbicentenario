<template>
 <!-- <div class="blog_post  "> -->
    <div class=" blog_post blog_style22" >
    <div class="blog_img">
      <DSILink
        pCustomLabel=" "
        :pCustomLink="'/novedades/' + pId"
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
            :pCustomLink="'/tag?tipo=NOVEDADES&tag=' + item"
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
    <div class="blog_content  bg-white ">
      <div class="blog_text">
        <div class="blog_title">
          <DSILink
            pCustomLabel=" "
            :pCustomLink="'/novedades/' + pId"
            pTipoLink="I"
            :pTitle="pTitulo"
          >
            {{ pTitulo }}
          </DSILink>
        </div>
        <p>
          {{ pBajada }}
        </p>
      </div>
      <br>
      <DSILink
          pCustomLabel=" "
          :pCustomLink="'/novedades/' + pId"
          pTipoLink="I"
          pClass="fa-solid fa-circle-plus"
          pTitle="Más detalle de la novedad"
        >
         <!--  <i class="ti-angle-double-right align-middle text align-center"></i>
              <img src="@/assets/images/ICON_vermas_celeste.png" :placeholder="5" /> -->
           <div class="img-container m-4">
           <img src="@/assets/images/ICON-mas-azul.png" />
           </div>
            </DSILink>
          
    </div>
  </div> 
 <!-- </div> -->
</template>
<script>
import DSILink from "@/components/DSILink";
export default {
  components: { DSILink },
  props: ["pId", "pTitulo", "pBajada", "pImagen","pTags"],
};
</script>
<style>
  .img-container {
        text-align: center;
        /*margin-bottom: 10px;*/
           }
  /*.blog_style122 {
    
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    background-color: #1a428b ;
    border-radius: 20% !important;
    
} */
.blog_style22 {
    padding:0px;
    margin-bottom: 10px;
    /*box-shadow: 0 0 5px rgb(0 0 0 / 20%);*/
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: white;
    border-radius: 5%;
    color:white !important;
    min-height: 450px;
    max-height: 450px;
}
    </style>
