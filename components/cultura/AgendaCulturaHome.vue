<template data-animation="fadeInUp" data-animation-delay="0.1s" class="animation">
    <section class="col-12 small_pt small_pb gray_bg">
        <div class="row justify-content-center mb-5">
            <div class="col-lg-6 col-md-9 cultura_color">
                <div class="heading_s1 text-center">
                    <h2>Proximos eventos</h2>
                </div>
            </div>
        </div>
     <Carousel v-if="this.dates.length > 0" class="cultura_color" :list_items="this.dates"  /> 
        <!--<Carousel v-if="this.dates.length > 0" class="cultura_color" :list_items="this.dates" :buttons="buttonsList" /> -->
        <h5 v-else class="text-center">No hay eventos futuros.</h5>
        <!-- <ImageSlider class="mt-5 pt-5" :images="images" /> -->
    </section>
</template>
<script>
import { mapGetters } from "vuex";
import Carousel from '@/components/cultura/EventCarousel.vue';
import ImageSlider from '@/components/cultura/ImageSlider.vue';

export default {
    components: {
        Carousel,
        ImageSlider,
    },
    head: {
        title: "Municipalidad de Tandil - Bicentenario",
        meta: [
            {
                hid: "description",
                name: "description",
                content: "Información acerca de las instituciones y carreras educativas de Tandil",
            },
        ],
    },
    data() {
        return {
            dates: [],
/*
            // Placeholder buttons
            "buttonsList": [
                {
                    "title": "Cine",
                    "link": "/agenda?categoria=1"
                },
                {
                    "title": "Teatro",
                    "link": "/agenda?categoria=2"
                },
                {
                    "title": "Danza",
                    "link": "/agenda?categoria=3"
                },
                {
                    "title": "Otro",
                    "link": "/agenda?categoria=4"
                }
            ],   tere 22/02*/
        }
    },

    computed: {
        ...mapGetters({
            getEventosAgenda: "posts/getEventosAgenda"
        })
    },

    methods: {
        getRecentDates() {
            this.$store
                .dispatch("posts/getAgenda")
                .then((res) => {
                    this.dates = this.parseDays(this.getEventosAgenda);
                })
                .catch((error) => {
                    this.$nuxt.error({
                        statusCode: 404,
                        message: "Ocurrio un error " + error
                    });
                });
        },
        parseDays(res) {
            let displayList = [];
            res.items.forEach((day) => {
                let date = this.parseDate(day.fecha);
                let link = "/eventos/" + day.id_evento + "?day_id=" + day.id_dia;
                let id = day.id_evento + "" + day.id_dia;
                let event = {
                    id: id,
                    title: day.titulo,
                    link: link,
                };
                this.insertEvent(displayList, date, event);
            });
            return displayList;
        },
        insertEvent(array, date, event) {
            let inserted = false;
            for (let i = 0; i < array.length; i++) {
                if (array[i].date == date) {
                    array[i].display_events.push(event);
                    inserted = true;
                }
            }
            if (inserted == false) {
                let aux_date = new Date(date);
                let name_month = aux_date.toLocaleString("default", { month: "long" });
                let total_day = aux_date.getDate() + 1;
                let result = name_month + " " + total_day;

                let link =
                    "agenda?titulo&categoria&desde=" + date + "&hasta=" + date;

                let display_events = [event];
                let newDay = {
                    date: date,
                    title: result,
                    link: link,
                    display_events: display_events,
                };
                array[array.length] = newDay;
            }
        },

        parseDate(full_date) {
            return full_date.slice(0, 10);
        },
    },

    /*
     ** programatically start the loader so we force the page to take x seconds to load
     */
    mounted() {
        this.getRecentDates();
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => this.$nuxt.$loading.finish(), 3000);
        });
    },

};
</script>
<style>
/* Clases necesarias para cambiarle el color al carousel */
.cultura_color .carousel-btn {
    background-color: #1A428B !important;
    border-color: #1A428B !important;
}

.cultura_color .owl-prev,
.cultura_color .owl-next {
    color: #1A428B !important;
}

.cultura_color .heading_s1::before {
    background-color: #1A428B !important;
}

.cultura_color .li-custom :hover {
    color: #1A428B !important;
}
</style>