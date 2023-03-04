<template>
    <div>
        <Header />
        <BannerPage :beadcrumb="beadcrumbPage" :title="'Cronograma de eventos'"></BannerPage>
        <div class="container mt-5">
            <div class="row">
                <InputBar class="mt-4" @cargarFiltros="this.submitSearch" :categorias="this.categorias"
                    :lugares="this.lugares" :pCategoria="categoria" :pTitulo="titulo" :pDesde="fecha_desde"
                    :pHasta="fecha_hasta" :pLugar="lugar" />
            </div>
            <h6 class="pt-5 mt-2">{{ this.resultadoQuery }}</h6>
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
import InputBar from "@/components/cultura/busqueda/InputBar.vue";
import Header from "@/components/Header.vue";
import BannerPage from "@/components/BannerPage.vue";
import { mapGetters } from "vuex";


export default {
    components: {
        AgendaItem,
        InputBar,
        Header,
        BannerPage
    },

    head: {
        title: "Municipalidad de Tandil - Cultura y educación",
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
        submitSearch(params) {
            if (params.categoria == 0 || params.categoria == "0") {
                params.categoria = "";
            }

            if (params.lugar == 0 || params.lugar == "0") {
                params.lugar = "";
            }

            this.$router.push({
                path: "agenda",
                query: {
                    titulo: params.titulo, categoria: params.categoria, lugar: params.lugar,
                    desde: params.fecha_desde, hasta: params.fecha_hasta
                },
            });
        },
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
        f_search(titulo, categoria, lugar, desde, hasta) {

            categoria == "0" || categoria == 0 ? categoria = "" : categoria;
            lugar == "0" || lugar == 0 ? lugar = "" : lugar;

            let query = {
                fecha1: this.alterDate(desde),
                fecha2: this.alterDate(hasta),
                titulo: titulo,
                categoria: categoria,
                espacio: lugar
            }

            this.getEvents(query);
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
        getEvents(params) {
            this.$store
                .dispatch("posts/getEventosPorFecha", params)
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
                this.f_search(titulo, categoria, lugar, desde, hasta);
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
                this.f_search(titulo, categoria, lugar, today, later);
            }
        },

        descriptionChecker(item) {
            if (item.desc_tarea != null && item.desc_tarea == item.titulo) {
                return item.descripcion == null ? "" : item.descripcion.slice(0, 120);
            } else {
                return item.desc_tarea == null ? "" : item.desc_tarea.slice(0, 120);
            }
        }
    },

    computed: {
        ...mapGetters({
            getEventosFecha: "posts/getEventosFecha",
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
    border-color: #B14549 !important;
}

.cultura_colors {
    background-color: white;
}

.cultura_colors .btn-custom:hover {
    background-color: #B14549 !important;
    color: white !important;
}

.cultura_colors .title-custom>*:hover {
    color: #B14549 !important;
}

.pagination .page-item a {
    color: #B14549 !important;
}

.page-item.active .page-link,
.page-item .page-link:hover {
    background-color: #B14549 !important;
    border-color: #B14549 !important;
    color: white !important;
}

.custom-btn {
    background-color: transparent !important;
    color: #B14549 !important;
    border-color: #B14549 !important;
}

.custom-btn:hover {
    background-color: #B14549 !important;
    color: white !important;
}

.custom-highlight {
    color: #B14549;
}

.btn-outline-default {
    color: black !important;
}

.form-control:focus {
    border-color: #B14549;
}

.custom_select {
    color: #B14549 !important;
}
</style>