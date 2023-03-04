<template>
    <section class="small_pb overflow_hide">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6 col-sm-12 mb-4 mb-lg-0 animation" data-animation="fadeInLeft"
                    data-animation-delay="0.2s">
                    <div>
                        <img :src="imagen" alt="about_img6" />
                    </div>
                </div>
                <div class="col-md-6 col-sm-12 animation" data-animation="fadeInRight" data-animation-delay="0.4s">
                    <div class="heading_s3 mb-3">
                        <span class="sub_title sub-title-custom">{{ ubicacion }}</span>
                        <h3>{{ nombre }}</h3>
                    </div>
                    <p class="text-break">{{ descripcion }}</p>
                    <div class=" justify-content-around justify-content-md-between mt-5 d-none d-md-flex">
                        <ul class="list_none social_icons border_social mt-2 mt-md-0">
                            <li v-if="email"><a :href="formattedEmail"><i class="ion-ios-email-outline"></i></a>
                            </li>
                            <li v-if="ubilink"><a target="_blank" :href="ubilink"><i class="ion-location"></i></a></li>
                            <li v-if="telefono"><a :href="formattedPhone"><i class="ion-android-call"></i></a></li>
                        </ul>
                        <div>
                            <nuxt-link class="btn btn-outline-default rounded-0 btn-custom" :to="'/agenda?lugar=' + id">
                                Ver eventos aquí
                            </nuxt-link>

                            <!-- <nuxt-link class="btn btn-outline-default rounded-0 btn-custom"
                                :to="'/buscar?tipo=ALL&texto=' + nombre">Ver noticias
                            </nuxt-link> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="atencion" class="container mt-md-5">
            <h3>Atención:</h3>
            <p class="text-break">{{ atencion }}</p>
        </div>


        <!-- Se renderiza esto si está en mobile con bootstrap (d-md-none) -->
        <div v-if="telefono" class="row justify-content-around justify-content-md-between mt-lg-5 px-2  d-md-none">
            <ul class="list_none social_icons border_social mt-2 mt-md-0">
                <li v-if="email"><a :href="formattedEmail"><i class="ion-ios-email-outline"></i></a>
                </li>
                <li v-if="ubilink"><a target="_blank" :href="ubilink"><i class="ion-location"></i></a></li>
                <li v-if="telefono"><a :href="formattedPhone"><i class="ion-android-call"></i></a></li>
            </ul>
            <div>
                <nuxt-link class="btn btn-outline-default rounded-0 btn-custom" :to="'/agenda?lugar=' + id">Ver eventos
                    aquí</nuxt-link>

                <!-- <nuxt-link class="btn btn-outline-default rounded-0 btn-custom" :to="'/buscar?tipo=ALL&texto=' + nombre">Ver
                    noticias
                </nuxt-link> -->
            </div>
        </div>
    </section>
</template>
<script>
import DSILink from "@/components/DSILink.vue";

export default {
    props: ['nombre', 'ubicacion', 'imagen', 'ubilink', 'email', 'telefono', 'descripcion', 'atencion', 'id'],

    components: { DSILink },
    computed: {
        formattedEmail() {
            return "mailto:" + this.email;
        },
        formattedPhone() {
            return "tel:" + this.telefono;
        }
    },
}

</script>