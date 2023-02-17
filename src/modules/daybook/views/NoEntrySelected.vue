<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">No hay nada seleccionado</h1>
  </div>
  <Fab @on:click="goToCreateNewEntry"/>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import useEntrySelected from '../composables/useEntrySelected'


export default {
    components:{
        Fab: defineAsyncComponent( () => import('../components/Fab.vue'))
    },
    setup(){
      const { goToCreateNewEntry } = useEntrySelected()
      return {
        goToCreateNewEntry
      } 
    }
}
</script>

<style lang="scss" scoped>
div{
    height: 100%;
}
</style>