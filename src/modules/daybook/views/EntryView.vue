<template>
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2" >
          <div>
              <span class="text-success fs3 fw-bold">{{ day }}</span>
              <span class="mx-1 fs-3">{{ month }}</span>
              <span class="mx-2 fs-4 fw-light">{{ year }}, {{ yearDay }}</span>
          </div>
      
          <div>
              <button class="btn btn-danger mx-2" @click="onDeleteEntry" v-if="entry.id">
                  Borrar
                  <i class="fa fa-trash-alt"></i>
              </button>

              <input 
                ref="imageSelector"
                type="file"
                @change="onSelectedImage"
                v-show="false"
                accept="image/png, image/jpeg"
              >
              
              <button 
                    class="btn btn-primary" 
                    @click="onSelectImage">
                  Subir foto
                  <i class="fa fa-upload"></i>
              </button>        
          </div>
      
          <Fab 
            icon="fa-save"
            @on:click="onSaveEntry"
          />
      
          <img 
            v-if="entry.picture && !localImage" 
            :src="entry.picture" 
            alt="entry picture" 
            class="img-thumbail" />
          
          <img
            v-if="localImage" 
            :src="localImage" 
            alt="entry picture" 
            class="img-thumbail" 
            />
      
        </div>
        <hr>
        <div class="d-flex flex-column px-3 h-75">
          <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
        </div>
    </template>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import useEntryDetail from '../composables/useEntryDetail'
import useDayMonthYear from '../composables/useDayMonthYear'
import Swal from 'sweetalert2'

import uploadImage from '@/modules/daybook/helpers/uploadImage'


export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    setup(props){

        const {
            imageSelector, 
            localImage,
            file,
            entry, 
            saveEntry,
            deleteEntry, 
        } = useEntryDetail(props)

        if(!entry) return
        

        const date = new Date(entry.value.date)
        const {
            day,
            month,
            year,
            yearDay
        } = useDayMonthYear(date)

        
        return {
            imageSelector,
            localImage,
            file,
            entry,
            day,
            month,
            year,
            yearDay,
            onSaveEntry: async () => {
                new Swal({
                    title: 'Espere por favor',
                    allowOutsideClick: false
                })
                Swal.showLoading()
                
                const picture = await uploadImage(file.value)
                entry.value.picture = picture

                await saveEntry( entry.value )
                localImage.value = null
                Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
            },
            onDeleteEntry: async () => {
                const { isConfirmed } = await Swal.fire({
                    title: '¿Está seguro?',
                    text: 'Una vez borrado, no se puede recuperar',
                    showDenyButton: true,
                    confirmButtonText: 'Si, estoy seguro'
                })
                if(isConfirmed){
                    new Swal({
                        title: 'Espere por favor',
                        allowOutsideClick: false
                    })
                    Swal.showLoading()                    
                    await deleteEntry( entry.value.id ) 
                    Swal.fire('Eliminado', '', 'success')
                }
            },
            onSelectedImage( event ){
                const fileR = event.target.files[0]
                if(! fileR ){
                    localImage.value = null
                    return
                }
                file.value = fileR
                const fileReader = new FileReader()
                fileReader.onload = () => localImage.value= fileReader.result
                fileReader.readAsDataURL(fileR)
            },
            onSelectImage() {
                imageSelector.value.click()
            }
        } 
    }
}
</script>

<style lang="scss" scoped>
textarea{
    font-size:20px;
    border:none;
    height: 100%;
    &:focus{
        outline: none;
    }
}
img{
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color:#000000, $alpha: 1.0);
    border:5px solid #FFF;
    border-radius:5px;
}
</style>