
import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demos-f3b07-default-rtdb.firebaseio.com'
})

export default journalApi

