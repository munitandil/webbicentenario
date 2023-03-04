<template>
   <div>
      <Header />
      <NovedadDetalle /> 
      <!-- <FeriaDetalle />  -->
   </div>
</template>

<script>
import NovedadDetalle from "@/components/ferias/detalleNovedad.vue";
//import FeriaDetalle from "@/components/ferias/detalleNovedad.vue";
import Header from "@/components/Header";

export default {
  components: { NovedadDetalle, Header },
  /*
  ** programatically start the loader so we force the page to take x seconds to load
  */
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 3000)
    })
  },
};
</script>