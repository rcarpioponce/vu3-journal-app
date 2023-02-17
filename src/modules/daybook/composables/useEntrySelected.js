import { useRouter } from 'vue-router'


const useEntrySelected = (props) => {
    const router = useRouter()
    return {
        goToCreateNewEntry: () => {
            router.push({ name: 'entry', params:{id: 'new' }})
        }
    }
}

export default useEntrySelected