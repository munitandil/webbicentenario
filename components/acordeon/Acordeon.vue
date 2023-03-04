<template>
    <div id="accordion-2" class="accordion accordion_style1">
        <!-- Nota al pie: Solo el primer AcordeonItem SI O SI tiene que tener :expanded="true" -->

        <AcordeonItem v-if="items" v-for="(institucion, i) in items" :key="institucion.id" :id="institucion.id"
            :title="institucion.nombre" :phone="institucion.telefono" :ubication="institucion.ubicacion"
            :email="institucion.email" :ubiLink="institucion.ubilink" :director="institucion.director"
            :image="institucion.imagen" :text="institucion.texto" :expanded="i == 0 ? true : false" />
    </div>
</template>
<script>
import AcordeonItem from '@/components/acordeon/AcordeonItem.vue'
export default {
    name: "Acordeon",
    components: { AcordeonItem },
    props: ["items"],
}
</script>
<style>

</style>