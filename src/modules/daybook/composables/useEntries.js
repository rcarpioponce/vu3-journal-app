import { computed, ref } from 'vue'
import { useStore } from 'vuex'


const useEntries = () => {
    const store = useStore()

    const term = ref('')


    return {
        term,
        entriesByTerm: computed(() => store.getters['journal/getEntriesByTerm'](term.value))
    }
}

export default useEntries
