<template>
    <div class="card" v-if="id">
        <div class="card-header" :id="headingId">
            <h6 class="mb-0"> <a :class="collapsed" data-toggle="collapse" :href="'#' + collapseId"
                    :aria-expanded="toggler" :aria-controls="collapseId">{{ title }}</a> </h6>
        </div>
        <div :id="collapseId" class="collapse" :class="show" :aria-labelledby="headingId" data-parent="#accordion-2">
            <div class="card-body">

                <div v-if="ubication && ubication.length > 0" class="col-md-12 my-3">
                    <span class="ti-location-pin"></span>
                    <label><strong>Dirección:</strong></label>
                    <label>{{ ubication }}</label>
                </div>

                <div v-if="phone" class="col-md-12 mb-3">
                    <span class="ti-mobile"></span>
                    <label><strong>Teléfono:</strong></label>
                    <label>{{ phone }}</label>
                </div>

                <div v-if="email && email.length > 0" class="col-md-12 mb-3">
                    <span class="ti-email"></span>
                    <label><strong>Email:</strong></label>
                    <label v-if="email.length > 0"><a :href="'mailto:' + email">{{ email }}</a></label>
                </div>

                <div v-if="ubiLink && ubiLink.length > 0" class="col-md-12 mb-3">
                    <span class="ti-pin"></span>
                    <label><strong>Ubicación:</strong></label>
                    <DSILink :pTipoLink="'E'" :pCustomLink="ubiLink" :pCustomLabel="'Link a mapa'" />
                </div>

                <div v-if="director && director.length > 0" class="col-md-12 mb-3">
                    <span class="ti-user"></span>
                    <label><strong>Director/a:</strong></label>
                    <label>{{ director }}</label>
                </div>

                <div v-if="text && text.length > 0" class="col-md-12 mb-3">
                    <label><strong>Información:</strong></label>
                    <div v-html="text" />
                </div>

                <div v-if="image && image.length > 1" class="col col-md-12 mb-3">
                    <!-- <label><strong>Imagen:</strong></label> -->
                    <img class="acordeon_img" :src="image" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DSILink from '@/components/DSILink.vue';
export default {
    name: "AcordeonItem",
    components: { DSILink },
    props: ["id", "title", "ubication", "phone", "email", "ubiLink", "director", 'expanded', 'text', 'image'],
    computed: {
        headingId: function () {
            return "heading-" + this.id;
        },
        collapseId: function () {
            return "collapse-" + this.id;
        },
        show: function () {
            return this.expanded && this.expanded == true ? "show" : "";
        },
        toggler: function () {
            return this.expanded && this.expanded == true ? true : false;
        },
        collapsed: function () {
            return this.expanded && this.expanded == true ? "" : "collapsed";
        }
    },
}
</script>
<style>
.card-header a::after {
    color: #B14549;
}

.card-header a:hover {
    color: #B14549;
}

.card-body span {
    color: #B14549;
}

.acordeon_img {
    border-radius: 3px;
    display: block;
    max-width: 600px;
    object-fit: contain;
    width: auto;
    height: auto;
}
</style>