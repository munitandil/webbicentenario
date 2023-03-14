<template>
  <div>
    <Header />
  <!--Banner/--> 
  <!--  <div class="container">
     <div class="row align-items-center">
      <div class="carousel-item  active ">
          <div class="col-md-4 mb-4 " >  
            <video  height="400" whith="500" src="~assets/images/video_tandil_web.mp4" autoplay loop muted>
              Tu navegador no admite el elemento <code>video</code>.
            </video>
          </div>
      </div> 
     </div>     
    </div> -->
     <section class="pt-0 mt-5 col-md-12 dsi-vide-bice "> 
      <div class="dsi-container"> <!--container020312"> -->
        <div class="row align-items-center">
            <div class="col-md-6 animation" data-animation="fadeInLeft" data-animation-delay="0.1s">
            	<div class=" about_video_img mb-4 mb-lg-0"> 
            	<!--	<img src="@/assets/images/foto_i.png" alt="about_img4"/>  -->
              <!-- <div class="heigt=40px with=80px" > -->
               <div >
                <video width="100%" autoplay loop muted  > 
                    <source src="~assets/images/16-02-2023SpotBicentenario.mp4">
                </video> 
               </div>    
              </div>    
            </div>
            <div class="col-md-6 col-sm-12 animation" data-animation="fadeInRight" data-animation-delay="0.1s" style="align-self: flex-start;">
                <div class="heading_s3 mb-md-3"> 
                  <div class="titu1"> EL BICENTENARIO  </div>
                </div>
                <div class="text_1_bicen">
                <p>La fecha formal es el 4 de abril, pero Tandil vive en todo este 2023 su Bicentenario, sus primeros 200 años.</p><p> Un hito inmenso en nuestra historia.</p><p> 
En este tiempo toda la comunidad merece celebrar y compartir la historia, los logros, el esfuerzo colectivo y los proyectos y anhelos hacia adelante, para construir el Tandil que se levantará sobre las bases del presente por el que trabajamos en el Acuerdo del Bicentenario.</p>
<p>Recordemos juntos el Tandil del pasado que sentó las bases, el presente que recorremos lleno de actividades para celebrar y el futuro que todos construiremos. Caminemos juntos.</p>
              </div>
              <!--  <a href="demo-consultancy/about.html"> por ahora-->
				

				<!--
					<div class="cart_list img">
		        		<img src="diseño/ICON- ver mas 2.png" style="width: 25vw; min-width: 140px;"></a>				
                   </div>	 por ahora-->
				
            </div>

				</div>

    </div>
     </section>  
<!-- <nruevo> -->
<section class="counter_wrap small_pt col-md-12 dsi-actividad">
    <div class="dsi-container">
        <div class="row align-items-center justify-content-center">
        	<div class="col-md-5 text-center text-md-left mb-4 mb-md-0 animation" data-animation="fadeInLeft" data-animation-delay="0.01s">
            	<div class="heading_s3 mb-md-3 text-center text-md-left">
                	<div class="titu2">El inicio de un nuevo camino</div>
                </div>
                <div class="text_1">
                <p>El inicio de un nuevo camino. Una historia compartida. Un presente lleno de desafíos. Un futuro pujante. El Bicentenario de Tandil es el punto de partida que encuentra a una comunidad que trabaja de manera conjunta hacia nuevos logros</p>
              </div>
            <!--    <a href="#" class="btn btn-outline-black btn-radius">know More</a>-->
            </div>
        	<div class="col-lg-6 offset-lg-1 col-md-7 col-sm-12 col-11">
            	<div class="row overflow_hide">
                	<div class="col-6 couter_border counter_border_black">
                        <div class="box_counter counter_dark text-center">
                       <!--     <i class="ion-coffee"></i>-->
								<img src="@/assets/images/ICON-reuniones.png"  style="height:15%; width:15%;">
                            <h3 class="counter_text"><span class="counter">30</span>+</h3>
                            <p>Dias de Eventos</p>
                        </div>
                    </div>
                    <div class="col-6 couter_border counter_border_black">
                        <div class="box_counter counter_dark text-center">
							<img src="@/assets/images/ICON-cafe.png"  style="height:15%; width:15%;">
                            <h3 class="counter_text"><span class="counter">93</span></h3>
                            <p>Instituciones en el Acuerdo</p>
                        </div>
                    </div>
                    <div class="col-6 couter_border counter_border_black">
                        <div class="box_counter counter_dark text-center">
                           <!-- <i class="ion-easel"></i>-->
						   <img src="@/assets/images/ICON-proyectos.png"  style="height:15%; width:15%;">
                            <h3 class="counter_text"><span class="counter">365</span>+</h3>
                            <p>Dias de Celebración</p>
                        </div>
                    </div>
                    <div class="col-6 couter_border counter_border_black">
                        <div class="box_counter counter_dark text-center">
                           <!-- <i class="ion-android-contacts"></i>-->
						   	<img src="@/assets/images/ICON-participantes.png"  style="height:15%; width:15%;">
                            <h3 class="counter_text"><span class="counter">150162</span>+</h3>
                            <p>Tandilenses</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>
<!-- END SECTION COUNTER -->

      <!-- START SECTION NOVEDADES -->

      <ActividadesHome />  
      <NovedadesHome />
    </div>
<!--  </div>  a verr-->
</template>
<script>
import Banner from "@/components/Banner";
import Top6Home from "@/components/Top6Home";
import NovedadesHome from "@/components/novedades/novedadesHome";
import DestacadoHome from "@/components/programas/destacadoHome";
import InfoStandoutTopHome from "@/components/InfoStandoutTopHome";
import InfoTopHome from "@/components/InfoTopHome";
// import DialogPopupHome from "@/components/DialogPopupHome";
import Header from "@/components/Header";
import CarouTere from "@/components/CarouTere.vue";
import MuestraMapa from "@/components/MuestraMapa.vue";
//import AgendaCulturaHome from "@/components/cultura/AgendaCulturaHome.vue";
import ActividadesHome from "@/components/actividades/novedadesHome";

export default {
  components: {
    Header,
    Banner,
    Top6Home,
    NovedadesHome,
    DestacadoHome,
  //  ProgramaHome,
    // LogosHome,
    InfoTopHome,
    InfoStandoutTopHome,
 //   DialogPopupHome,
    CarouTere,
    MuestraMapa,
   // AgendaCulturaHome,
    ActividadesHome
  },
  head: {
    title: "Municipalidad de Tandil - Bicentenario Inicio",
  },
  /*
   ** programatically start the loader so we force the page to take x seconds to load
   */
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 3000);
    });
  },
};
</script>

<style>

.heading_s5::before {
  background-color: #1a428b!important;

}
.text_1_bicen {
    text-align: justify;
    font-family: helvetica;
    font-size: 18px;
    line-height: normal;
    letter-spacing: 0.3px;
}

.text_1 {
    text-align: justify;
    font-family: helvetica;
    font-size: 18px;
    line-height: normal;
    letter-spacing: 0.3px;
    
}
.titu1 {
    color:	#1a428b!important;
    text-align: left;
    text-transform:uppercase;
    font-family:Helvetica;
    font-weight:bold;
    font-size: 24pt;
}
.titu2 {
    color:	#1a428b!important;
    text-align: center;
    text-transform:uppercase;
    font-family:Helvetica;
    font-weight:bold;
    font-size: 24pt;
}
.video-container {
   /* position: relative;*/
   /* padding-bottom: 56.25%;
   
    padding-top: 0;*/
    width: 600px;
  height: 400px;
  border: 3px solid #73AD21;
    
    /*overflow: hidden;*/
}

.video-container iframe,
.video-container object,
.video-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
