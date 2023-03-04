<template>
    <div>
        <section class="small_pb overflow_hide">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6 col-sm-12 mb-4 mb-lg-0 animation" data-animation="fadeInLeft"
                        data-animation-delay="0.2s">
                        <div>
                            <img :src="imagen" alt="imagen de evento" class="rounded" />
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12 animation" data-animation="fadeInRight" data-animation-delay="0.4s">
                        <div class="heading_s3 mb-3">
                            <nuxt-link v-if="espacio_id && espacio_nombre" :to="'/espacios-culturales/' + espacio_id">
                                <h6 class="sub_title cultura_color">{{ espacio_nombre }}</h6>
                            </nuxt-link>
                            <h3>{{ titulo + ' día ' + dia }}</h3>
                        </div>
                        <p>{{ descripcion }}</p>

                        <p>Desde el <strong>{{ fecha_desde }}</strong> hasta el <strong>{{ fecha_hasta }}</strong>.</p>

                        <!-- Se renderiza SOLO si está en mobile (d-none) -->
                        <div class="d-md-none" v-if="actividad != titulo && titulo != null">
                            <h5>Descripción actividad diaria: </h5>
                            <p>{{ actividad }}</p>
                        </div>


                        <ul class="list_none social_icons border_social mt-2 mt-md-0">
                            <li v-if="link_externo"><a :href="link_externo"><i class="ion-link"></i></a></li>
                            <li v-if="mapa"><a :href="mapa"><i class="ion-map"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- SOLO se renderiza si está en tablet, para arriba (d-none, d-md-block) -->
        <div class="container pb-5 d-none d-md-block" v-if="actividad != titulo && titulo != null">
            <h5>Descripción actividad diaria: </h5>
            <p>{{ actividad }}</p>
        </div>
    </div>
</template>
<script>
import FragmentoMapa from "@/components/FragmentoMapa.vue";
import DSILink from "@/components/DSILink.vue";

export default {
    props: ['titulo', 'descripcion', 'link_externo', 'fecha_desde', 'fecha_hasta', 'mapa', 'actividad', 'imagen', 'dia', 'lugar', 'espacio_id', 'espacio_nombre'],

    components: { FragmentoMapa, DSILink },
}

</script>
<style>
.event_img {
    width: 100%;
    border-radius: 5px;
}

.cultura_color {
    color: #1A428B !important;
}
</style>