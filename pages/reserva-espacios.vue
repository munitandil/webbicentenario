
<template>
    <div>
        <Header />
        <BannerPage :beadcrumb="beadcrumbPage" :title="'Solicitud reserva espacios culturales'"
            :subtitle="'Si querés reservar un espacio cultural, rellená el formulario y nos contactaremos con vos.'">
        </BannerPage>
        <section class="small_pt small_pb">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 animation" data-animation="fadeInUp" data-animation-delay="0.4s">
                        <div class="clearfix medium_divider d-xl-none"></div>
                        <div class="field_form">
                            <form ref="dsiFormQuery" method="post" name="enq" @submit.prevent="onSubmit"
                                class="needs-validation" novalidate>
                                <div class="row">
                                    <!-- Msg del Formulario -->
                                    <div class="form-group  col-lg-12" v-if="errorConsultaMsg.length > 0">
                                        <div class="alert alert-danger" role="alert"> {{errorConsultaMsg}}</div>
                                    </div>
                                    <div class="form-group  col-lg-12" v-if="consultaEnviadaMsg.length > 0">
                                        <div class="alert alert-success" role="alert">{{consultaEnviadaMsg}}</div>
                                    </div>
                                    <!-- Fin Msg del Formulario -->
                                    <div class="form-group col-lg-6">
                                        <input maxlength="200" required="required" placeholder="Ingrese su Nombre *"
                                            id="first-name" class="form-control" name="name" type="text"
                                            v-model="nombre">
                                        <div class="invalid-feedback">Debe completar este campo.</div>
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <input maxlength="200" required="required" placeholder="Ingrese su Apellido *"
                                            id="last-name" class="form-control" name="lastname" type="text"
                                            v-model="apellido">
                                        <div class="invalid-feedback">Debe completar este campo.</div>
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <input maxlength="200" required="required" placeholder="Ingrese su Email *"
                                            id="email" class="form-control" name="email" type="email" v-model="email">
                                        <div class="invalid-feedback">Debe ingresar un email válido.</div>
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <input maxlength="40" required="required"
                                            placeholder="Ingrese su Nro. de teléfono. *" id="phone" class="form-control"
                                            name="phone" type="phone" v-model="telefono" @keypress="onlyNumber">
                                        <div class="invalid-feedback">Debe completar este campo.</div>
                                    </div>
                                    <div class="form-group col-lg-12">
                                        <textarea @keydown.enter.prevent="" class="form-control" maxlength="300"
                                            required="required" id="mensaje" placeholder="Ingrese su mensaje *"
                                            name="mensaje" type="text" v-model="mensaje" rows="3"></textarea>
                                        <div class="invalid-feedback">Debe ingresar un mensaje.</div>
                                    </div>
                                    <div class="form-group col-lg-12 text-center" v-if="show">
                                        <div class="form-group col-lg-12 text-center">
                                            <button type="submit" title="Enviar su consultar!" class="btn btn-success"
                                                id="submitButton" name="submit" value="Submit">Enviar</button>
                                        </div>
                                    </div>
                                    <div class="form-group col-lg-12 text-center" v-else>
                                        <button @click.prevent="newQuery" type="button" title="Nueva consulta"
                                            class="btn btn-default" id="nuevaConsulta" name="nuevaConsult"
                                            value="">Nueva Consulta</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import BannerPage from "@/components/BannerPage.vue";
import Header from "@/components/Header";

export default {
    components: { BannerPage, Header },

    head: {
        title: "Municipalidad de Tandil - Reserva de espacios",
        meta: [
            {
                hid: "description",
                name: "description",
                content: "Reserva de espacios culturales de la ciudad de tandil",
            },
        ],
    },

    data() {
        return {
            show: true,
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
            mensaje: "",
            errorConsultaMsg: "",
            consultaEnviadaMsg: "",
            beadcrumbPage: [
                { path: "HOME", link: true },
                {
                    currentPage: "Reserva espacios",
                },
            ],
        };
    },
    /*
     ** programatically start the loader so we force the page to take x seconds to load
     */
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => this.$nuxt.$loading.finish(), 3000);
        });
    },
    methods: {
        onlyNumber($event) {
            //console.log($event.keyCode); //keyCodes value
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
                $event.preventDefault();
            }
        },
        checkEmail(email) {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(email)) {
                return false;
            }
            return true
        },
        validarData() {
            if (this.nombre.trim() === "" || this.apellido.trim() === "" ||
                this.email.trim() === "" || this.telefono.trim() === "" ||
                this.mensaje.trim() == "" || !this.checkEmail(this.email)) {
                return false
            }
            return true
        },
        onError(error) {
            console.log('Error happened:', error)
            this.errorConsultaMsg = "Debe completar el recaptcha."
        },
        f_enviar() {
            let payload = {
                'nombre': (this.nombre || '').substring(0, 100) + " " + (this.apellido || '').substring(0, 100),
                'telefono': (this.telefono || '').substring(0, 40),
                'email': (this.email || '').substring(0, 200),
                'mensaje': this.mensaje.substring(0, 300).replaceAll("\n", " ")
            }

            this.$store
                .dispatch("reservaEspacio/crearReserva", payload)
            this.consultaEnviadaMsg = "Su consulta ha sido enviada correctamente.";
        },
        onSubmit() {
            this.show = true;
            this.errorConsultaMsg = "";
            this.consultaEnviadaMsg = "";
            if (this.validarData()) {
                this.f_enviar();
            } else {
                this.errorConsultaMsg = "Debe completar los campos obligarios del formulario para enviar la consulta."
            }
        },
        newQuery() {
            this.nombre = ""
            this.apellido = ""
            this.email = ""
            this.telefono = ""
            this.mensaje = ""
            this.show = true
            this.$refs.dsiFormQuery.reset()
        }
    }
};
</script>    