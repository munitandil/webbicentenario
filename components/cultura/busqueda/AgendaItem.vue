<template>
    <div class="event_schedule animation" data-animation="fadeInUp" data-animation-delay="0.1s">
        <div class="schedule_info">
            <ul>
                <li>
                    <h6 class="custom-highlight">{{ formattedCategory }}</h6>
                </li>
                <!-- <li><h6 >{{ hour_range }}</h6></li> -->
                <li>
                    <h6 class="date"><strong>{{ formattedDate }}</strong></h6>
                </li>

                <li v-if="place">
                    <h6 class="date text-secondary">{{ place }}</h6>
                </li>
            </ul>
            <h3 class="title-custom">
                <DSILink v-if="day_id" :pCustomLink="'/eventos/' + id + '?day_id=' + day_id" pTipoLink="I">
                    {{ title }}</DSILink>
                <DSILink v-else :pCustomLink="'/eventos/' + id" pTipoLink="I">{{ title }}</DSILink>
            </h3>
            <div class="schedule_desc mt-2">
                <p>{{ formattedDescription }}</p>
            </div>

            <DSILink v-if="day_id" :pCustomLink="'/eventos/' + id + '?day_id=' + day_id" pTipoLink="I"
                class="btn btn-outline-default rounded-0 btn-custom">
                Ver más...</DSILink>

            <DSILink v-else :pCustomLink="'/eventos/' + id" pTipoLink="I"
                class="btn btn-outline-default rounded-0 btn-custom">
                Ver más...</DSILink>
        </div>
    </div>
</template>

<script>
import DSILink from '@/components/DSILink.vue';
import { mapGetters } from "vuex";
export default {
    components: { DSILink },
    props: ["title", "hour_range", "description", "id", "day_id", "category", "date", "place"],

    data() {
        return {
            formattedCategory: ""
        }
    },

    mounted() {
        this.formatCategory();
    },

    computed: {
        ...mapGetters({
            getCategorias: "posts/getEvCategorias",
        }),

        formattedDate: function () {
            let date = new Date(this.date);
            let aux = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
                + "/" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1))
                + "/" + date.getFullYear();
            return aux;
        },

        formattedDescription() {
            let desc = this.description;
            if (desc != null && desc.length > 0) {
                return desc + "...";
            } else return "";
        }
    },
    methods: {
        getCategory(number) {
            let cats = this.getCategorias;
            for (let i = 0; i < cats.length; i++) {
                if (cats[i].value == number) {
                    return cats[i].name;
                }
            }
        },

        formatCategory() {
            let categorias = this.category.split(":");
            let categorias_str = "";
            categorias.forEach(cat => {
                categorias_str += this.getCategory(parseInt(cat)) + ", ";
            });
            this.formattedCategory = categorias_str.slice(0, categorias_str.length - 2).toUpperCase();
        }
    },
}
</script>