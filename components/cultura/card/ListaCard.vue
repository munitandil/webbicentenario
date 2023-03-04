<template>
    <div class="col-md-12 mb-md-4 mb-5 mt-5 pb-2">
        <div class="blog_post">
            <div class="blog_img">
                <nuxt-link :to="'/espacios-culturales/' + id">
                    <img :src="image">
                </nuxt-link>
            </div>
            <div class="blog_content bg-white">
                <div class="blog_text">
                    <div class="d-flex">
                        <h6 class="blog_title">
                            <nuxt-link :to="'/espacios-culturales/' + id">{{ title }}</nuxt-link>
                        </h6>
                        <h6 class="ml-3 text-secondary">{{ formattedType }}</h6>
                    </div>
                    <p class="text-break">{{ description }}</p>
                    <strong v-if="extra && extra.length > 0">{{ extra }}</strong>
                    <!-- <a href="#" class="text-capitalize">Read More</a> -->
                </div>
                <ul class="list_none blog_meta">
                    <li v-if="phone"><a :href="a_phone"><i class="ion-ios-telephone"></i>{{ fd_phone }}</a></li>
                    <li v-if="email"><a :href="fd_email"><i class="ion-email"></i>{{ email }}</a></li>
                    <li v-if="ubication"><a :href="link"><i class="ion-android-pin"></i>{{ ubication }}</a></li>
                </ul>
                <nuxt-link class="btn btn-outline-default rounded-0 btn-custom mt-3 mt-md-5"
                    :to="'/espacios-culturales/' + id">
                    Ver más
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "card",
    props: ['title', 'image', 'description', 'phone', 'email', 'ubication', 'link', 'extra', 'id', 'type'],
    data() {
        return {
            fd_phone: "+54",
            a_phone: "",
            fd_email: ""
        }
    },

    created() {
        if (this.phone) {
            this.fd_phone = this.fd_phone + this.phone;
            this.a_phone = "tel:" + this.fd_phone;
        }
        if (this.email) {
            this.fd_email = "mailto:" + this.email;
        }
    },

    computed: {
        formattedType() {
            if (this.type == "M") {
                return "Espacio Municipal";
            } else return "Espacio Registrado";
        }
    }

}
</script>