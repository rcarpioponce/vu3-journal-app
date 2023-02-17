// export const myAction =  async ({ commit }) => {

// }

import journalApi from "@/api/journalApi"

export const loadEntries =  async ({ commit }) => {
    const { data } = await journalApi.get('/entries.json')

    if( !data) {
        commit('setEntries', [])
    }

    const entries = []
    for(let id of Object.keys( data )){
        entries.push({
            id,
            ...data[id]
        })
    }
    commit('setEntries', entries)
}

export const updateEntry =  async ({ commit }, entry ) => {
    console.log('updatEntry', entry)
    const { id, date, picture, text } = entry
    const dataToSave = { date, picture, text }
    const { data } = await journalApi.put(`/entries/${id}.json`, dataToSave)
    
    commit('updateEntry', {...entry})
}

export const createEntry =  async ({ commit }, entry) => {
    console.log('createEntry', entry)
    const { date, picture, text } = entry
    const dataToSave = { date, picture, text }
    const { data } = await journalApi.post('/entries.json', dataToSave)
    dataToSave.id = data.name

    commit('addEntry', dataToSave)
    
    return dataToSave.id
}

export const deleteEntry = async({commit}, id) => {
    console.log('deleteentry', id)
    await journalApi.delete(`/entries/${id}.json`)
    commit('deleteEntry', id)
}