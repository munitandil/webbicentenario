<template>
    <header class="header_wrap dark_skin hover_menu_style2">
    
       <div  class="col-md-12  justify-content-end">
       <ul class="list_none social_icons text-end border_social rounded_social text-md-right mt-2 mr-2 mt-md-0">
        <li><a href="https://www.facebook.com/MunicipiodeTandil/"><i class="ion-social-facebook"></i></a></li>
        <li><a href="https://twitter.com/GobiernoTandil"><i class="ion-social-twitter"></i></a></li>
        <li><a href="https://www.instagram.com/municipiodetandil/?hl=es-la"><i class="ion-social-instagram-outline"></i></a></li>
        <li><a href="https://www.youtube.com/user/MunicipioVideos"><i class="ion-social-youtube"></i></a></li> 
      </ul>
      </div> 
      <div class="">
            <!--<nav class="navbar-expand-lg"> -->
              <nav class="navbar-expand-lg">
                <div class=" d-lg-flex align-items-left container"> 
                         <DSILink pClass="navbar-brand" pCustomLabel=" " pPath="HOME" pTipoLink="I"
                            pTitle="Logo de la municipalidad de tandil">
                            <img  class="cultura_logo" src="~assets/images/LOGO_municipio_bic.png" alt="logo" /> 
                         </DSILink>
                         <DSILink pClass="navbar-brand" pCustomLabel=" " pPath="HOME" pTipoLink="I"
                            pTitle="Logo de la municipalidad de tandil">
                             <img class="logo_dark" src="~assets/images/LOGO-bicentenario.png" alt="logo" />
                            <img class="cultura_logo" src="~assets/images/LOGO-bicentenario.png" alt="logo" />
                         </DSILink>
                         <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation"> <span class="ion-android-menu"></span>
                         </button>
                  </div>
              </nav>     
    <!-- </div>   -->
    <!--   <div class="col-md-8 collapse navbar-collapse justify-content-end" -->
        <div class="navbar-expand-lg justify-content-end"  
                          id="navbarSupportedContent"> 
                 <ul class="navbar-nav justify-content-end">                       
                        <div v-for="menuItem in getPathNivelInicial" :key="menuItem.id_item">
                         <!--<MenuItem :link_externo="menuItem.tipo_link" :clases="'nav-link custom-cultura-nav-link'"   -->
                            <MenuItem :link_externo="menuItem.tipo_link" :clases="'nav-link '"
                                :descr="menuItem.descr" :link="menuItem.link" :idString="menuItem.id_string"
                                v-if="hasChildren(menuItem.id_string) === 0" />
                         <!--   <MenuItemChildren :nivel="menuItem.nivel" :descr="menuItem.descr" :link="menuItem.link"
                                :idString="menuItem.id_string" v-else class="custom-cultura-nav-link" /> -->
                                <hr>      
                        </div>
                    <!--     <li class="dsi-search-menu-sm">
                            <div class="dsi-divider"></div>
                            <SearchFormHeader pClass="search_box2" />
                        </li>
                        <li class="dsi-social-menu-sm">
                            <ul class="list_none social_icons text-center text-md-right mt-2 mt-md-0">
                                <li>
                                    <NetworkSocial />
                                </li>
                                <li>
                                    <div class="dsi-divider-left"></div>
                                    <DSILink pClass="sc_email" pCustomLabel=" " pPath="CONTACTO" pTipoLink="I"
                                        pTitle="Telefonos, email, Contactos">
                                        <i class="ti-email"></i>
                                    </DSILink>
                                </li>
                            </ul>
                        </li>  -->
                 </ul>
      </div>    
    </div>      
    </header>
</template>


<script>
import { mapGetters } from 'vuex'
import MenuItem from "@/components/MenuItem.vue";
import MenuItemChildren from "@/components/MenuItemChildren.vue"
import DSILink from "@/components/DSILink";
import SearchFormHeader from "@/components/SearchFormHeader.vue";
import NetworkSocial from "@/components/NetworkSocial.vue"
export default {
    components: {
        MenuItem,
        MenuItemChildren,
        DSILink,
        SearchFormHeader,
        NetworkSocial
    },
    computed: {
        ...mapGetters({
            getPathNivelInicial: 'paths/getPathNivelInicial',
            hasChildren: 'paths/hasChildren'
        })
    },
};
</script>

<style>
/* Mobile & Tablet */
.custom-cultura-nav-link,
.custom-cultura-nav-link>* {
    color: #4f17c0 !important;
}
hr {
      height: 5px;
      margin-right: 0%;
      margin-top:0%;
      width: 100%;
      background-color: #0abaee ;
    }
    .cultura_logo {
        height: 15vh;
        width: auto;
        max-width: unset !important;
    }
/*
.navbar-nav-div-li.nav-link::before {
    background-color: #fff !important;
}

.cultura_logo {
        height: 7.5vh;
        width: auto;
        max-width: unset !important;
    }


/* Desktop  
@media (min-width: 992px) {

    .cultura_logo {
        height: 10vh;
        width: auto;
        max-width: unset !important;
    }

    .custom-cultura-nav {
        background-color: #fff !important;
    }

    .custom-cultura-nav-link,
    .custom-cultura-nav-link>* {
        color: rgb(41, 39, 39) !important;
    }

    //  La linea que se hace al hover  
    .navbar-nav-div-li.nav-link::before {
        background-color: rgb(85, 233, 147) !important;
    }
} */
</style>