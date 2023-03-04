<template>
    <section class="small_pt">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6 col-sm-12 mb-4 mb-lg-0 animation" data-animation="fadeInLeft"
                    data-animation-delay="0.2s">
                    <div>
                        <img class="event_img" alt="about_img6" :src="imagen" />
                    </div>
                </div>
                <div class="col-md-6 col-sm-12 animation text-center" data-animation="fadeInRight"
                    data-animation-delay="0.4s">
                    <div class="heading_s3 mb-3">
                        <h3>{{ titulo }}</h3>
                    </div>

                    <div class="row justify-content-around my-5">
                        <div class="text-center">
                            <h5 class="sub_title cultura_text_color">DESDE</h5>
                            <h6>{{ fecha_desde }}</h6>
                        </div>

                        <div class="text-center">
                            <h5 class="sub_title cultura_text_color">HASTA</h5>
                            <h6>{{ fecha_hasta }}</h6>
                        </div>

                        <div class="text-center" v-if="mapa && mapa.length > 0">
                            <h5 class="sub_title cultura_text_color">MAPA</h5>
                            <DSILink pCustomLabel=" " :pCustomLink="mapa" pTipoLink="E">Ver más</DSILink>
                        </div>

                        <div v-if="link && link.length > 0" class="text-center">
                            <h5 class="sub_title cultura_text_color">MÁS INFO</h5>
                            <strong>
                                <DSILink pCustomLabel=" " :pCustomLink="link" pTipoLink="E">Ver más</DSILink>
                            </strong>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-5" v-if="descripcion">
                <h4 class="cultura_text_color">Descipción:</h4>
                <p>{{ descripcion }}</p>
            </div>


            <div class="my-5" v-if="actividad != titulo && actividad != null">
                <h4 class="cultura_text_color">Actividad diaria:</h4>
                <p>{{ actividad }}</p>
            </div>


            <!-- <div class="dsi-descargas-novedades light_gray_bg" v-if="folleto">
                <div class="comment-title mb-2 mb-sm-4">
                    <h5>Descargas</h5>
                </div>
                <ul>
                    <li v-for="item in folleto.split('|#|')" :key="item">
                        <DSILink pCustomLabel=" " :pCustomLink="item" pTipoLink="E" pTitle="Descargar archivo">
                            <i class="icon icon-file-pdf" v-if="item.split('.').pop() === 'pdf'"></i>
                            <i class="icon icon-file-word" v-else-if="item.split('.').pop() === 'doc'"></i>
                            <i class="icon icon-image" v-else-if="
                              item.split('.').pop() === 'png' ||
                              item.split('.').pop() === 'jpeg' ||
                              item.split('.').pop() === 'jpg'
                            "></i>
                            <i class="icon icon-file-text" v-else></i>
                            <p>
                                Descargar <br /><span>{{
                                item.split("/").pop()
                                }}</span>
                            </p>
                        </DSILink>
                    </li>
                </ul>
            </div> -->

            <!-- <FragmentoMapa v-if="mapa && mapa.length > 0" class="col-12" :link="mapa" /> -->
        </div>
    </section>
</template>
<script>
import FragmentoMapa from "@/components/FragmentoMapa.vue";
import DSILink from "@/components/DSILink.vue";

export default {
    props: ['titulo', 'descripcion', 'folleto', 'link_externo', 'fecha_desde', 'fecha_hasta', 'mapa', 'actividad', 'link', 'imagen'],

    components: { FragmentoMapa, DSILink },
}

</script>
<style>
.event_img{
    width: 100%;
    border-radius: 5px;
}
</style>