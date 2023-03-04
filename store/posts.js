const base64 = require('base-64');
// State
// repositorio central de posts, la ideas es que los distintos componentes, consumas los posts que esta cargados en este repositorio
export const state = () => ({
    _posts: [],
    _postscmit: [],
    _postHome: [],
    _postHomeAct: [],
    _postStandout: [],
    _postStandoute: [],
    _bannerHome: [],
    _alertaHome: [],
    _top3: [],
    _allTags: [],
    _lastPosts: [],
    _postByTag: [],
    _detalle: [],
    _categorias: [],
    _lugares: [],
    _detalle_feria: [],
    _relacionadas: [],
    _elencos: []
})

const tok = 'restapi:restapi';
const hash = base64.encode(tok);
const Basic = 'Basic ' + hash;

// Actions
// hacemos la funcion asyncrona, para esperar el tiempo de respuesta del endopoint
// solo las acciones pueden usar async-await
// estas acciones son llamadas desde los componentes
export const actions = {
    async loadPosts(vuexContext) {
        // Obtener una lista de novedades en el home
        //http://enif.tandil.gov.ar:8080/ords/adminweb/api/bic_novedades_home
        try {
            let res = await this.$axios.get('/api/bic_novedades_home', {
                headers: {
                    'Authorization': Basic
                }
            });
            vuexContext.commit('setPostsHome', res.data.items);
        } catch (e) {
            console.log('Error al cargar la lista de novedades del home: ', e) // undefined
        }
        //obtener actividades de agenda
        try {
            let res = await this.$axios.get('/api/evento_bice_home', {
                headers: {
                    'Authorization': Basic
                }
            });
            vuexContext.commit('setPostsHomeAct', res.data.items);
        } catch (e) {
            console.log('Error al cargar la lista de act del home: ', e) // undefined
        }
        // Obtener una lista de novedades destacadas
        try {
            let res = await this.$axios.get('/api/novedades_programas_cul', {
                headers: {
                    'Authorization': Basic
                }
            });
            vuexContext.commit('setPostsStandout', res.data.items);
        } catch (e) {
            console.log('Error al cargar la lista de programas: ', e) // undefined
        }  ///standout vienen programas
        try {
            let res = await this.$axios.get('/api/novedades_programas_cul_e', {
                headers: {
                    'Authorization': Basic
                }
            });
            vuexContext.commit('setPostsStandoute', res.data.items);
        } catch (e) {
            console.log('Error al cargar la lista de programas de educ.: ', e) // undefined
        }  ///standout vienen programas educacion
        try {
            let res = await this.$axios.get('/api/ferias_cul', {
                headers: {
                    'Authorization': Basic
                }
            });
            vuexContext.commit('setPostsHomeTop3', res.data.items);
        } catch (e) {
            console.log('Error al cargar las novedades top3 del home: ', e) // undefined
        }
        // en home top3 vienen ferias
        // Obtener una lista de novedades de alerta (home)
        try {
            let res = await this.$axios.get('/api/info_top', {
                headers: {
                    'Authorization': Basic
                }
            });
            vuexContext.commit('setPostsInfoTop', res.data.items);
        } catch (e) {
            console.log('Error al cargar la novedade alerta - Home Top: ', e) // undefined
        }

        // Obtener una lista banner en el home
        try {
            let res = await this.$axios.get('/api/banner_home', {
                headers: {
                    'Authorization': Basic
                }
            });
            vuexContext.commit('setBannerHome', res.data.items);
        } catch (e) {
            console.log('Error al cargar los banner del home: ', e) // undefined
        }
        //console.log(res);
        // Obtener una lista cmit
        try {
            let res = await this.$axios.get('/api/cmit_cul', {
                headers: {
                    'Authorization': Basic
                }
            });
            vuexContext.commit('setPostscmit', res.data.items);
        } catch (e) {
            console.log('Error al cargar cmit del home: ', e) // undefined
        }
    },
    getAllPost(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/api/bic_novedades_todas', {
                headers: {
                    'Authorization': Basic
                }
            })
                .then((res) => {
                    vuexContext.commit('setPosts', res.data.items)
                    resolve(res)
                })
                .catch((error) => {
                    reject(error.response.data.errors)
                })
        })
    },
    getAllPostAct(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/api/evento_bice_all', {
                headers: {
                    'Authorization': Basic
                }
            })
                .then((res) => {
                    vuexContext.commit('setPosts', res.data.items)
                    resolve(res)
                })
                .catch((error) => {
                    reject(error.response.data.errors)
                })
        })
    },
    getAllPostscmit(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios.get("/api/cmit_cul", {
                headers: {
                    'Authorization': Basic
                }
            })
                .then((res) => {
                    vuexContext.commit('setPosts', res.data.items)
                    resolve(res)
                })
                .catch((error) => {
                    reject(error.response.data.errors)
                })
        })
    },
    getAllTags(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios.get("/api/novedades/tags_home", {
                headers: {
                    'Authorization': Basic
                }
            })
                .then((res) => {
                    vuexContext.commit('setAllTags', res.data.items[0].tag.split('|#|'))
                    resolve(res)
                })
                .catch((error) => {
                    reject(error.response.data.errors)
                })
        })
    },
    getLastPosts(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios.get("/api/novedades_ulti_cul", {
                headers: {
                    'Authorization': Basic
                }
            })
                .then((res) => {
                    vuexContext.commit('setLastPost', res.data.items)
                    resolve(res)
                })
                .catch((error) => {
                    reject(error.response.data.errors)
                })
        })
    },
    getPostsByTag(vuexContext, p_tag) {
        return new Promise((resolve, reject) => {
            this.$axios.get("/api/novedades_x_tag_cul/" + p_tag, {
                headers: {
                    'Authorization': Basic
                }
            })
                .then((res) => {
                    vuexContext.commit('setPostsByTag', res.data.items)
                    resolve(res)
                })
                .catch((error) => {
                    reject(error.response.data.errors)
                })
        })
    },
    getSearchDetalle(vuexContext, id) {
        return new Promise((resolve, reject) => {
          //  this.$axios.get("/api/novedades_cul/" + id, {
            this.$axios.get("/api/bic_novedades_id/" + id, {
                headers: {
                    'Authorization': Basic
                }
            })
                .then((res) => {
                    vuexContext.commit('setDetalle', res.data.items[0])
                    resolve(res)
                })
                .catch((error) => {
                    // console.log("Error al cargar el detalle de la Guias de Tramites: ", error); // undefined
                    reject(error.response.data.errors)
                })
        })
    },
    getSearchDetalleAct(vuexContext, id) {
        return new Promise((resolve, reject) => {
          //  this.$axios.get("/api/novedades_cul/" + id, {
            this.$axios.get("/api/evento_bice_id/" + id, {
                              headers: {
                    'Authorization': Basic
                }
            })
                .then((res) => {
                    vuexContext.commit('setDetalle', res.data.items[0])
                    resolve(res)
                })
                .catch((error) => {
                    // console.log("Error al cargar el detalle de la Guias de Tramites: ", error); // undefined
                    reject(error.response.data.errors)
                })
        })
    },
    getSearchDetalleFeria(vuexContext, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get("/api/ferias_cul/" + id, {
                headers: {
                    'Authorization': Basic
                }
            })
                .then((res) => {
                    vuexContext.commit('setDetalleFeria', res.data.items[0])
                    resolve(res)
                })
                .catch((error) => {
                    // console.log("Error al cargar el detalle de la Guias de Tramites: ", error); // undefined
                    reject(error.response.data.errors)
                })
        })
    },
    getSearchRelacionadas(vuexContext, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get("/api/novedades_relacionadas/" + id, {
                headers: {
                    'Authorization': Basic
                }
            })
                .then((res) => {
                    vuexContext.commit('setRelacionadas', res.data.items)
                    resolve(res)
                })
                .catch((error) => {
                    // console.log("Error al cargar el detalle de la Guias de Tramites: ", error); // undefined
                    reject(error.response.data.errors)
                })
        })
    },
    getAgenda(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios.get("/api/evento_bice_home", {
                   headers: {
                    'Authorization': Basic
                },
            })
                .then((res) => {
                    vuexContext.commit('setEventosAgenda', res.data);
                    resolve(res.data);
                })
                .catch((error) => {
                    // console.log("Error al cargar el resultado de la busqueda: ", error); // undefined
                    reject(error.response.data.errors);
                });
        });
    },
    getEventosPorFecha(vuexContext, params) {

        return new Promise((resolve, reject) => {
            this.$axios
                .get("/api/evento_cul_filtros", {
                    params,
                    headers: { 'Authorization': Basic },
                })
                .then((res) => {
                    vuexContext.commit('setEventosFecha', res.data.items);
                    resolve(res.data.items);
                })
                .catch((error) => {
                    reject(error.response.data.errors);
                });
        });
    },
    getEscuelas(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios
                .get("/api/cul_escuelas ", {
                    headers: { 'Authorization': Basic },
                })
                .then((res) => {
                    vuexContext.commit('setEscuelas', res.data.items);
                    resolve(res.data.items);
                })
                .catch((error) => {
                    reject(error.response.data.errors);
                });
        });
    },
    getPrimerasInfancias(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios
                .get("/api/cul_primera_inf", {
                    headers: { Authorization: Basic },
                })
                .then((res) => {
                    vuexContext.commit('setPrimerasInfancias', res.data.items);
                    resolve(res.data.items);
                })
                .catch((error) => {
                    reject(error.response.data.errors);
                });
        });
    },

    getBibliotecas(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios
                .get("/api/cul_biblioteca", {
                    headers: { Authorization: Basic },
                })
                .then((res) => {
                    vuexContext.commit('setBibliotecas', res.data.items);
                    resolve(res.data.items);
                })
                .catch((error) => {
                    reject(error.response.data.errors);
                });
        });
    },

    getTalleresMunicipales(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios
                .get("/api/cul_taller", {
                    headers: { Authorization: Basic },
                })
                .then((res) => {
                    vuexContext.commit('setTalleres', res.data.items);
                    resolve(res.data.items);
                })
                .catch((error) => {
                    reject(error.response.data.errors);
                });
        });
    },

    getEspaciosCulturales(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios
                .get("/api/cul_espacios_culturales", {
                    headers: { Authorization: Basic },
                })
                .then((res) => {
                    vuexContext.commit('setEspaciosCulturales', res.data.items);
                    resolve(res.data.items);
                })
                .catch((error) => {
                    reject(error.response.data.errors);
                });
        });
    },

    getAllElencos(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios
                .get("/api/cul_elencos", {
                    headers: { Authorization: Basic },
                })
                .then((res) => {
                    vuexContext.commit('setElencos', res.data.items);
                    resolve(res.data.items);
                })
                .catch((error) => {
                    reject(error.response.data.errors);
                });
        });
    },

    getEspacioCultural(vuexContext, params) {
        return new Promise((resolve, reject) => {
            this.$axios
                .get("/api/cul_espacios_culturales/" + params.id, {
                    headers: { Authorization: Basic },
                })
                .then((res) => {
                    // vuexContext.commit('setEvento', res.data.items[0]);
                    resolve(res.data.items[0]);
                })
                .catch((error) => {
                    reject(error.response.data.errors);
                });
        });
    },

    getEvento(vuexContext, params) {
        return new Promise((resolve, reject) => {
            this.$axios
                .get("/api/evento_bice_id/" + params.id, {
                    headers: {
                        Authorization: Basic,
                        'day_id': params.day_id,
                    },
                })
                .then((res) => {
                    vuexContext.commit('setEvento', res.data.items[0]);
                    resolve(res.data.items[0]);
                })
                .catch((error) => {
                    reject(error.response.data.errors);
                });
        });
    },
    getLegislacionesCultura(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios
                .get("/api/legislacion_c", {
                    headers: {
                        Authorization: Basic,
                    },
                })
                .then((res) => {
                    // vuexContext.commit('setLegislaciones', res.data.items[0]);
                    resolve(res.data.items);
                })
                .catch((error) => {
                    reject(error.response.data.errors);
                });
        });
    },

    getLegislacionesEducacion(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios
                .get("/api/legislacion_e", {
                    headers: {
                        Authorization: Basic,
                    },
                })
                .then((res) => {
                    resolve(res.data.items);
                })
                .catch((error) => {
                    reject(error.response.data.errors);
                });
        });
    },

    getEventoCategorias(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios
                .get("/api/cul_agenda_categorias", {
                    headers: {
                        Authorization: Basic,
                    },
                })
                .then((res) => {
                    vuexContext.commit('setEventoCategorias', res.data.items);
                    resolve(res.data.items);
                })
                .catch((error) => {
                    reject(error.response.data.errors);
                });
        });
    },

    getEventoLugares(vuexContext) {
        return new Promise((resolve, reject) => {
            this.$axios
                .get("/api/cul_agenda_lugares", {
                    headers: {
                        Authorization: Basic,
                    },
                })
                .then((res) => {
                    vuexContext.commit('setEventoLugares', res.data.items);
                    resolve(res.data.items);
                })
                .catch((error) => {
                    reject(error.response.data.errors);
                });
        });
    }
}

// Getters
// funciones publicas, con los cuales los componentes acceden al estado
export const getters = {
    getPosts(state) {
        return state._posts
    },
    getPostsAct(state) {
        return state._posts
    },
    getPostscmit(state) {
        return state._postscmit
    },
    getLastPost(state) {
        return state._posts.slice(Math.max(state._posts.length - 5, 1))
    },
    getPostsHomeTop3(state) {
        return state._top3
    },
    getPostsHome(state) {
        return state._postHome
    },
    getPostsHomeAct(state) {
        return state._postHomeAct
    },
    getPostsStandout(state) {
        return state._postStandout
    },
    getPostsStandoute(state) {
        return state._postStandoute
    },
    getPostsInfoTop(state) {
        return state._alertaHome
    },
    getBannerHome(state) {
        return state._bannerHome
    },
    getAllTags(state) {
        return state._allTags
    },
    getLastPosts(state) {
        return state._lastPosts
    },
    getPostsByTag(state) {
        return state._postByTag;
    },
    getDetalleNovedad(state) {
        return state._detalle;
    },
    getDetalleNovedadAct(state) {
        return state._detalle;
    },
    getDetalleFeria(state) {
        return state._detalle_feria;
    },
    getNovedadesRelacionadas(state) {
        return state._relacionadas;
    },
    getEventosAgenda(state) {
        return state._events;
    },
    getEventosFecha(state) {
        return state._events;
    },
    getEscuelas(state) {
        return state._escuelas;
    },
    getStoredPrimerasInfancias(state) {
        return state._prim_inf;
    },
    getEvento(state) {
        return state._event;
    },

    getStoredEspaciosCulturales(state) {
        return state._spaces;
    },
    getStoredBibliotecas(state) {
        return state._bibliotecas;
    },
    getTalleres(state) {
        return state._talleres;
    },
    getElencos(state) {
        return state._elencos;
    },
    getEvCategorias(state) {
        return state._categorias;
    },
    getEvLugares(state) {
        return state._lugares;
    },
}

// Mutaciones
// los estados solo pueden modificarse por medio de las mutaciones, solamente
export const mutations = {
    setPosts(state, posts) {
        state._posts = posts
    },
    setPostsAct(state, posts) {
        state._posts = posts
    },
    setPostscmit(state, posts) {
        state._postscmit = posts
    },
    setPostsHomeTop3(state, posts) {
        state._top3 = posts
    },
    setPostsHome(state, posts) {
        state._postHome = posts
    },
    setPostsHomeAct(state, posts) {
        state._postHomeAct = posts
    },
    setPostsStandout(state, posts) {
        state._postStandout = posts
    },
    setPostsStandoute(state, posts) {
        state._postStandoute = posts
    },
    setPostsInfoTop(state, posts) {
        state._alertaHome = posts
    },
    setBannerHome(state, posts) {
        state._bannerHome = posts
    },
    setAllTags(state, tags) {
        state._allTags = tags
    },
    setLastPost(state, posts) {
        state._lastPosts = posts
    },
    setPostsByTag(state, posts) {
        state._postByTag = posts
    },
    setDetalle(state, detalle) {
        state._detalle = detalle
    },
    setDetalleFeria(state, detalle) {
        state._detalle_feria = detalle
    },
    setRelacionadas(state, posts) {
        state._relacionadas = posts
    },
    setEventosAgenda(state, events) {
        state._events = events;
    },
    setEventosFecha(state, event) {
        state._events = event;
    },
    setEscuelas(state, escuelas) {
        state._escuelas = escuelas;
    },
    setPrimerasInfancias(state, prim_inf) {
        state._prim_inf = prim_inf;
    },
    setEvento(state, event) {
        state._event = event;
    },
    setEspaciosCulturales(state, spaces) {
        state._spaces = spaces;
    },
    setBibliotecas(state, biblios) {
        state._bibliotecas = biblios;
    },
    setTalleres(state, talleres) {
        state._talleres = talleres;
    },
    setElencos(state, elencos) {
        state._elencos = elencos;
    },
    setEventoCategorias(state, cats) {
        state._categorias = cats;
    },
    setEventoLugares(state, lugs) {
        state._lugares = lugs;
    }
}