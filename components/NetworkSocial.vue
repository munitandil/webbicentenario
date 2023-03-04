<template>  
    <ul :class="getClass()">
          <!-- V-IF quita el Twitter  -->
        <li  v-for="item in listNetworkSocial" v-if="item.id_red != 'TW'" :key="item.id_red">
            <DSILink :pClass="item.class" pCustomLabel=" " :pCustomLink="item.url"  pTipoLink="E" v-if="pUbicacion !== 'FOOTER'" :pTitle="item.titulo">
                    <span v-html="item.icon"></span>
            </DSILink>
            <DSILink pCustomLabel=" " :pCustomLink="item.url"  pTipoLink="E" :pTitle="item.titulo" v-else >
                    <span v-html="item.icon"></span>
            </DSILink>
        </li>
    </ul>
</template> 
<script>
import { mapGetters } from "vuex";
import DSILink from "@/components/DSILink";
export default {  
  components: {
    DSILink
  },  
  props:["pUbicacion"],
  computed: {
    ...mapGetters({     
      listNetworkSocial: "networkSocial/getAllNetworkSocial"
    }),
  },
  methods: {
    getClass() {
        let vclass = 'list_none social_icons text-center rounded_social text-md-right mt-2 mt-md-0';
        if (this.pUbicacion == 'FOOTER') {
            vclass = 'list_none footer_social'
        }
        return vclass
    },
  },

};
</script>