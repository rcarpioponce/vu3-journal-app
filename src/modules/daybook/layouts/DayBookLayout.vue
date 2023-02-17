<template>
  <Navbar />

  <div class="row justify-content-md-center" v-if="isLoading">
    <div class="col-3 alert-info text-center mt-5">
      Espere por favor...
      <h3 class="mt-2"></h3>
      <i class="fa fa-spin fa-sync"></i>
    </div>
  </div>

  <div class="d-flex" v-else>
    <div class="col-4">
        <entry-list />
    </div>
    <div class="col">
        <router-view />
    </div>
  </div>
</template>

<script>
import { computed, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'

export default { 
    components: {
        Navbar: defineAsyncComponent(() => import('../components/Navbar.vue')),
        EntryList: defineAsyncComponent(() => import('../components/EntryList.vue')) 
    },
    setup(){
      const store = useStore()
      store.dispatch('journal/loadEntries')
      return {
        isLoading: computed(() => store.state.journal.isLoading)
      }
    }
}
</script>

<style>

</style>
