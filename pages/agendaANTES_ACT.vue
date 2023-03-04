<template>
    <div>
        <Header />
        <BannerPage :beadcrumb="beadcrumbPage" :title="'Cronograma de eventos'"></BannerPage>
        <div class="container mt-5">
            <div class="row">
                <div class="col-12 booking_form justify-content-center">
                    <!-- animation" data-animation="fadeInUp" data-animation-delay="0.1s" -->
                 <!--   <form method="post" @submit.prevent="submitSearch" class="row align-items-center">
                        <div class="form-row justify-content-around col-12 col-lg-10">
                     
                            <div class="form_col col-lg-4">
                                <label>Título o nombre del evento:</label>
                                <div class="form_control">
                                    <input maxlength="50" class="form-control" type="text" v-model="titulo" name=""
                                        id="">
                                </div>
                            </div>
                            <div class="form_col col-lg-4">
                                <label>Fecha desde:</label>
                                <div class="form_control date-custom">
                                    <input class="form-control " v-model="fecha_desde" type="date" name="" id="">
                                </div>
                            </div>
                            <div class="form_col col-lg-4">
                                <label>Fecha hasta:</label>
                                <div class="form_control date-custom">
                                    <input class="form-control" v-model="fecha_hasta" type="date" name="" id="">
                                </div>
                            </div>
                            <div class="form_col col-lg-6 mt-lg-2">
                                <label>Lugar:</label>
                                <div class="custom_select">
                                    <select class="form-control" v-model="lugar">
                                        <option selected value="0">TODOS</option>
                                        <option v-if="lugares && lugares.length > 0" v-for="lug in lugares"
                                            :value="lug.value">
                                            {{ lug.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>  
                            <div class="form_col col-lg-6 mt-lg-2">
                                <label>Categoría:</label>
                                <div class="custom_select">
                                    <select class="form-control" v-model="categoria">
                                       
                                        <option selected value="0">TODAS</option>
                                        <option v-if="categorias && categorias.length > 0" v-for="cat in categorias"
                                            :value="cat.value">
                                            {{ cat.name }}
                                        </option>
                                    </select>
                                </div>
                            </div> -

                        </div>
                        <div class="form_col mt-4 col-lg-2">
                            <button type="submit" class="btn btn-default btn-block custom-btn"
                                name="submit">Buscar</button>
                        </div>
                    </form> -->
                </div>
            </div>
           <!-- <h6 class="pt-5 mt-2">{{ this.resultadoQuery }}</h6>  -->
        </div>  
        <div class="d-flex flex-column py-5 align-items-center bg_gray">
            <div class="col-10 col-md-7">
                <paginate name="agendaItems" :list="agendaItems" :per="5" v-if="agendaItems.length"
                    class="dsi-list-result row">
                    <AgendaItem class="cultura_colors mb-5 col-12" v-for="item in paginated('agendaItems')"
                        item.desc_tarea :key="item.id_evento + '' + item.id_dia" :title="item.titulo"
                        :description="descriptionChecker(item)" :date="item.fecha" :id="item.id_evento"
                        :day_id="item.id_dia" :category="item.categoria" :place="item.lugar" />
                </paginate>
                <h4 class="py-5" v-else>No se han encontrado eventos.</h4>
            </div>
            <div class="col-12 mt-4 mb-5 pb-5">
                <paginate-links :show-step-links="true" :hide-single-page="true" :limit="4" for="agendaItems" :classes="{
                    ul: ['pagination', 'justify-content-center'],
                    li: 'page-item',
                    a: ['page-link', 'page-link-cultura'],
                }" v-if="agendaItems.length">
                </paginate-links>
            </div>
        </div>
    </div>
</template>
<script>
import AgendaItem from "@/components/cultura/busqueda/AgendaItem.vue";
import Header from "@/components/Header.vue";
import BannerPage from "@/components/BannerPage.vue";
import { mapGetters } from "vuex";


export default {
    components: {
        AgendaItem,
        Header,
        BannerPage
    },

    head: {
        title: "Municipalidad de Tandil - Agenda",
        meta: [
            {
                hid: "description",
                name: "description",
                content: "Información acerca de la cultura de Tandil y sus instituciones.",
            },
        ],
    },

    watch: {
        $route(to, from) {
            // react to route changes...
            if (to !== from) {
                location.reload();
            }
        },
    },

    data() {
        return {
            titulo: "",
            categoria: "0",
            fecha_desde: "",
            fecha_hasta: "",
            lugar: "0",
            categorias: [],
            lugares: [],
            agendaItems: [],
            paginate: ['agendaItems'],
            resultadoQuery: "",

            beadcrumbPage: [
                { path: "HOME", link: true },
                {
                    currentPage: "Búsqueda en agenda",
                },
            ],
        }
    },

    methods: {
        showSearch(titulo, categoria, lugar, desde, hasta) {
            let query = "Mostrando resultados para: ";

            if (categoria != "0") query += "Eventos tipo " + this.getCategoryName(categoria) + ", ";
            else query += "Todos los eventos, ";

            if (lugar != "0") {
                query += "En " + this.getPlaceName(lugar) + ", ";
            } else query += "En todos los lugares, ";

            query += "del " + this.formatDate(desde) + " hasta " + this.formatDate(hasta);

            if (titulo != "") query += " , con título como " + ` '${titulo}' `;

            this.resultadoQuery = query;
        },
        getCategoryName(cat) {
            let catInt = parseInt(cat);
            for (let i = 0; i < this.categorias.length; i++) {
                if (this.categorias[i].value == catInt) {
                    return this.categorias[i].name;
                }
            }
        },
        getPlaceName(lugar) {
            let lugarInt = parseInt(lugar);
            for (let i = 0; i < this.lugares.length; i++) {
                if (this.lugares[i].value == lugarInt) {
                    return this.lugares[i].name;
                }
            }
        },
        formatDate(string) {
            console.log(string);
            let year = string.slice(0, 4);
            let month = string.slice(5, 7);
            let day = string.slice(8, 10);

            return day + "/" + month + "/" + year;
        },
        insertIntoInputs(titulo, categoria, lugar, desde, hasta) {
            this.titulo = titulo;
            this.categoria = categoria;
            this.lugar = lugar;
            this.fecha_desde = desde;
            this.fecha_hasta = hasta;
        },
        alterDate(date) {
            let date_aux = date.slice(8, 10) + date.slice(4, 7) + "-" + date.slice(0, 4);
            return date_aux;
        },
        getFormattedDateToday() {
            let today = new Date();
            return today.toJSON().slice(0, 10);
        },
        getFormattedDateFromCantDays(cantDias) {
            let later = new Date();
            later.setDate(later.getDate() + cantDias);
            return later.toJSON().slice(0, 10);
        },
        getEvents(titulo, categoria, lugar, desde, hasta) {


            categoria == "0" || categoria == 0 ? categoria = "" : categoria;
            lugar == "0" || lugar == 0 ? lugar = "" : lugar;

            let query = {
                fecha1: this.alterDate(desde),
                fecha2: this.alterDate(hasta),
                titulo: titulo,
                categoria: categoria,
                espacio: lugar
            }

            this.$store
                .dispatch("posts/getEventosPorFecha", query)
                .then((res) => {
                    this.agendaItems = res;
                })
                .catch((error) => {
                    this.$nuxt.error({
                        statusCode: 404,
                        message: "Ocurrio un error " + error
                    });
                });
        },
        // Si el objeto no está vacio
        checkURL() {
            if (JSON.stringify(this.$route.query) !== '{}') {
                let queries = this.$route.query;

                let titulo;
                queries.titulo ? titulo = queries.titulo : titulo = "";
                let categoria;
                queries.categoria ? categoria = queries.categoria : categoria = "0";
                let lugar;
                queries.lugar ? lugar = queries.lugar : lugar = "0";
                let desde;
                queries.desde ? desde = queries.desde : desde = this.getFormattedDateToday();
                let hasta;
                queries.hasta ? hasta = queries.hasta : hasta = this.getFormattedDateFromCantDays(5);

                this.showSearch(titulo, categoria, lugar, desde, hasta);
                this.insertIntoInputs(titulo, categoria, lugar, desde, hasta);
                this.getEvents(titulo, categoria, lugar, desde, hasta);
            }
            // Si no entra por primera vez, osea que no tiene queries...
            else {
                let today = this.getFormattedDateToday();
                let later = this.getFormattedDateFromCantDays(5);

                let categoria = "0";
                let lugar = "0";
                let titulo = "";

                this.showSearch(titulo, categoria, lugar, today, later);
                this.insertIntoInputs(titulo, categoria, lugar, today, later);
                this.getEvents(titulo, categoria, lugar, today, later);
            }
        },
        descriptionChecker(item) {
            if (item.desc_tarea != null && item.desc_tarea == item.titulo) {
                return item.descripcion == null ? "" : item.descripcion.slice(0, 120);
            } else {
                return item.desc_tarea == null ? "" : item.desc_tarea.slice(0, 120);
            }
        },
        submitSearch() {
            if (this.categoria == 0 || this.categoria == "0") {
                this.categoria = "";
            }

            if (this.lugar == 0 || this.lugar == "0") {
                this.lugar = "";
            }

            this.$router.push({
                path: "agenda",
                query: {
                    titulo: this.titulo, categoria: this.categoria, lugar: this.lugar,
                    desde: this.fecha_desde, hasta: this.fecha_hasta
                },
            });
        },
    },

    computed: {
        ...mapGetters({
            getCategorias: "posts/getEvCategorias",
            getLugares: "posts/getEvLugares"
        }),
    },

    created() {

        this.$store
            .dispatch("posts/getEventoCategorias")
            .then((res) => {
                this.categorias = this.getCategorias;
            })
            .catch((error) => {
                this.$nuxt.error({
                    statusCode: 404,
                    message: "Ocurrio un error " + error
                });
            });

        this.$store
            .dispatch("posts/getEventoLugares")
            .then((res) => {
                this.lugares = this.getLugares;
                setTimeout(() => {
                    this.checkURL();
                }, 500);
            })
            .catch((error) => {
                this.$nuxt.error({
                    statusCode: 404,
                    message: "Ocurrio un error " + error
                });
            });


    },

    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => this.$nuxt.$loading.finish(), 3000);
        });
    },
}
</script>
<style>
.bg_gray {
    background-color: #f7f7f7;
}

.cultura_colors .btn-custom {
    border-color: #1A428b !important;
}

.cultura_colors {
    background-color: white;
}

.cultura_colors .btn-custom:hover {
    background-color: #1A428b !important;
    color: white !important;
}

.cultura_colors .title-custom>*:hover {
    color: #1A428b !important;
}

.pagination .page-item a {
    color: 1A428b !important;
}

.page-item.active .page-link,
.page-item .page-link:hover {
    background-color: #1A428b !important;
    border-color: #1A428b !important;
    color: white !important;
}

.custom-btn {
    background-color: transparent !important;
    color: #1A428b !important;
    border-color: #1A428b !important;
}

.custom-btn:hover {
    background-color: #1A428b !important;
    color: white !important;
}

.custom-highlight {
    color: #1A428b;
}

.btn-outline-default {
    color: black !important;
}

.form-control:focus {
    border-color: #1A428b;
}

.custom_select {
    color: #1A428b !important;
}
</style>