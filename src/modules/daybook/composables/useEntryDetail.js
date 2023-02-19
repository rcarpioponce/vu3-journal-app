import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


const useEntryDetail = (props) => {
    const store         = useStore()
    const router        = useRouter()
    const localImage    = ref()
    const file          = ref()
    const imageSelector = ref()


    let entry = store.getters['journal/getEntriesById'](props.id)
    let entryNew = {
        text: '',
        date: new Date().getTime()
    }

    
    if(props.id !== 'new' && !entry){
        return router.push({name: 'no-entry'})
    }

    return {
        imageSelector,
        localImage,
        file,
        entry: computed(() => store.getters['journal/getEntriesById'](props.id) ? store.getters['journal/getEntriesById'](props.id) : entryNew),
        saveEntry: async ( entryUpdate ) => {
            if(entryUpdate.id){
                store.dispatch('journal/updateEntry', entryUpdate)
            }else{
                const id = await store.dispatch('journal/createEntry', entryUpdate)
                console.log(id)
                router.push({name:'entry', params: { id }})
            }
            
        },
        deleteEntry: async ( id ) => {
            await store.dispatch('journal/deleteEntry', id)
            router.push({name:'no-entry'})
        }
    }
}

export default useEntryDetail