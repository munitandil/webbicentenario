<template>
    <div class="col-12 booking_form justify-content-center">
        <!-- animation" data-animation="fadeInUp" data-animation-delay="0.1s" -->
        <form method="post" @submit.prevent="onSubmit" class="row align-items-center">
            <div class="form-row justify-content-around col-12 col-lg-10">
                <!-- align-items-end justify-content-between -->
                <div class="form_col col-lg-4">
                    <label>Título o nombre del evento:</label>
                    <div class="form_control">
                        <input maxlength="50" class="form-control" type="text" v-model="titulo" name="" id="">
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
                            <option v-if="lugares && lugares.length > 0" v-for="lug in lugares" :value="lug.value">
                                {{ lug.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form_col col-lg-6 mt-lg-2">
                    <label>Categoría:</label>
                    <div class="custom_select">
                        <select class="form-control" v-model="categoria">
                            <!-- <option value="">Seleccione un valor</option> -->
                            <option selected value="0">TODAS</option>
                            <option v-if="categorias && categorias.length > 0" v-for="cat in categorias"
                                :value="cat.value">
                                {{ cat.name }}
                            </option>
                        </select>
                    </div>
                </div>

            </div>
            <div class="form_col mt-4 col-lg-2">
                <button type="submit" class="btn btn-default btn-block custom-btn" name="submit">Buscar</button>
            </div>
        </form>
    </div>
</template>
<script>

export default {
    props: ["categorias", "lugares", "pTitulo", "pCategoria", "pDesde", "pHasta", "pLugar"],
    data() {
        return {
            titulo: "",
            categoria: "",
            lugar: "",
            fecha_desde: "",
            fecha_hasta: "",
        };
    },
    created() {
        let paramsEmpty = true;
        if (this.pDesde && this.pDesde.length > 0) {
            this.fecha_desde = this.pDesde;
            if (this.pHasta && this.pHasta.length > 0) {
                this.fecha_hasta = this.pHasta;
                paramsEmpty = false;
            }
        }
        this.titulo = this.pTitulo;
        if (this.pLugar != "TODOS") {
            this.lugar = this.pLugar;
        }
        else {
            this.lugar = "";
        }
        if (this.pCategoria != "ALL") {
            console.log(this.pCategoria);
            this.categoria = this.pCategoria;
        }
        else {
            this.categoria = "";
        }
        if (paramsEmpty) {
            // Si no le pasan una fecha agarra hoy por defecto
            this.fecha_desde = this.getFormattedDate(new Date());
            // En 5 dias
            let later = new Date();
            later.setDate(later.getDate() + 5);
            this.fecha_hasta = this.getFormattedDate(later);
        }
    },
    methods: {
        onSubmit() {
            // if (this.categoria == "0") {
            //     this.categoria = "ALL";
            // }
            let response = {
                titulo: this.titulo,
                categoria: this.categoria,
                lugar: this.lugar,
                fecha_desde: this.fecha_desde,
                fecha_hasta: this.fecha_hasta,
            };
            this.$emit("cargarFiltros", response);
        },
        getFormattedDate(date) {
            return date.toJSON().slice(0, 10);
        },
        // Supongo que me la pasa en el formato yyyy-mm-dd
        getUnformattedDate(string) {
            let year = string.slice(0, 4);
            let month = string.slice(5, 7);
            let day = string.slice(8, 10);
            let response = new Date();
            response.setFullYear(year, month - 1, day);
            return response;
        }
    },
}
</script>
<style>
.date-custom input {
    padding-right: 2.5% !important;
}
</style>