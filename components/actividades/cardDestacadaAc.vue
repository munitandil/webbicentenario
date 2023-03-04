<template>
  <div class="blog_post blog_style11">
    <div class="blog_img dsi-img-container">
      <!-- iva en 2do lug en dslink
      :pCustomLink="'/actividades/' + pId"-->
      <img :src="pImagen" alt="blog_small_img1_350X198" />
       <DSILink
        pCustomLabel=" "
        :pCustomLink="'/actividades/' + pId"
        pTipoLink="I"
        pTitle="Imagen preview de la novedad">
        <!--<img :src="pImagen" alt="blog_small_img1_350X198" /> -->
      </DSILink> 
      <div class="event_date_disenio">
                            <h6><span>{{pDia}}</span> {{pMes}}</h6>
		                 <!--   <i class="ion-arrow-right-c"></i>-->
                        </div>

      <div class="blog_postcontent" v-if="pTags && pTags.length !== 0">
        <div class="blog_tags text-white">
         <!-- <DSILink
            v-for="item in pTags.split('|#|').slice(0, 2)"
            pCustomLabel=" "
            :pCustomLink="'/tag?tipo=ACTIVIDADES&tag=' + item"
            pTipoLink="I"
            :key="item"
            :pTitle="item"
            pClass="blog_tags_cat blog_bg_dsi_color"
          >
            {{ item }}
          </DSILink> -->
        </div>
      </div>
    </div>
  <!--  <div class="blog_content bg-white "> -->
    <div class="blog_content_act  bg-blue text-white">
      <div class="blog_text_act2 ">
        <!-- h6-->
        <p class="blog_titleAc text-white">
      <!--    <DSILink
            pCustomLabel=" "
            :pCustomLink="'/actividades/' + pId"
            pTipoLink="I"
            :pTitle="pTitulo"
          >
            {{ pTitulo }}
          </DSILink> -->
          {{ pTitulo }}
        </p>
        <!-- h6-->
        <div class="blog_text_act3 ">
          {{ pBajada }}
        </div>
      </div>
      <!-- no va ver mas en agenda
      <DSILink
          pCustomLabel=" "
          :pCustomLink="'/actividades/' + pId"
          pTipoLink="I"
          pClass="fa-solid fa-circle-plus"
          pTitle="Más detalle de la novedad"
        >
           más detalle <i class="ti-angle-double-right align-middle"></i>
          
          <div class="img-container">
           <img src="@/assets/images/ICON-ver mas-celeste_ch.png" />
            </div>
         
            </DSILink>
          --> 
    </div>
  </div>
</template>
<script>
import DSILink from "@/components/DSILink";
export default {
  components: { DSILink },
  props: ["pDia","pMes","pId", "pTitulo", "pBajada", "pImagen","pTags"],
};
</script>
<style>

.blog_style11 {
    padding:0px;
    margin-bottom: 10px;
    /*box-shadow: 0 0 5px rgb(0 0 0 / 20%);*/
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: #1a428b;
    border-radius: 5%;
    color:white !important;
    min-height: 450px;
    max-height: 450px;
}
.event_date_disenio h6 {
	display: table-cell;
	vertical-align: middle;
	color: #fff;
	text-transform: uppercase;
	font-size: 14px;
	transition: all 0.3s ease-in-out;
}
.event_date_disenio h6 span {
	font-size: 24px;
	font-weight: bold;
	display: block;
}
.event_date_disenio {
    position: absolute;
    bottom: -35px;
    left: 0;
    right: 0;
    text-align: center;
    width: 70px;
    margin: 0 auto;
    height: 70px;
    background-color: #1A428B;
    border-radius: 100%;
    padding: 5px;
    display: table;
    z-index: 1;
}
.event_date_disenio::before {
    content: "";
    position: absolute;
    left: -5px;
    top: -5px;
    bottom: -5px;
    right: -5px;
    background-color: #1A428B;
    border-radius: 100%;
   /* opacity: 0.5; --le saco el borde*/
    z-index: -1;
}
.event_info_disenio {
	padding: 55px 15px 25px;
	text-align: center;
    background-color: #1A428B;
	color: #fff;
}
.event_info_disenio li {
    display: inline-block;
    vertical-align: middle;
    padding: 0 5px;
}

.dsi-img-container img{
  width: 100% ;
}
</style>