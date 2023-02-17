import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

const useEntry = (props) => {
    const router = useRouter()
    const store = useStore()
    return {
        shortText: computed(() => props.entry.text.length > 130 ?  props.entry.text.substring(0, 130)+'...' :  props.entry.text ), 
        day: computed(() => {
            const date = new Date(props.entry.date)
            return date.getDate()
        }),
        month: computed(() => {
            const date = new Date(props.entry.date)
            return months[ date.getMonth()]
        }),
        year: computed(() => {
            const date = new Date(props.entry.date)
            return date.getFullYear()
        }),
        yearDay: computed(() => {
            const date = new Date(props.entry.date)
            return days[date.getDay()]
        }),
        entryDetail: computed (() => store.getters['journal/getEntriesById'](props.id)),
        onClickEntry: () => router.push({name: 'entry', params: {id: props.entry.id }})
    }
}

export default useEntry
