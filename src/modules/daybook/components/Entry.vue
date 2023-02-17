<template>
    <div class="entry-container pb-3 pointer p-2" @click="onClickEntry">
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">{{ day }}</span>
            <span class="mx-1 fs-5">{{ month }}</span>
            <span class="mx-2 fw-light">{{ year }}, {{ yearDay }}</span>
        </div>

        <div class="entry-description">
        {{ shortText }}
        </div>
        
    </div>
</template>

<script>
import useEntry from '../composables/useEntry'
import useDayMonthYear from '../composables/useDayMonthYear'

export default {
    props: {
        entry: {
          type: Object,
          required: true  
        }
    },    
    setup(props){
        const {  
            shortText, 
            onClickEntry 
        } = useEntry(props)

        const date = new Date(props.entry.date)
        const {
            day,
            month,
            year,
            yearDay
        } = useDayMonthYear(date)
        
        return {
            day,
            month,
            year,
            yearDay,
            shortText,
            onClickEntry
        }
    }
}
</script>

<style lang="scss" scoped>
.entry-container{
    border-bottom: 1px solid #2c3e50;
    transition: 0.2 all ease-in;
    &:hover{
        background-color:lighten($color: grey, $amount: 45);
        transition: 0.2 all ease-in;
    }
    .entry-description{
        font-size: 12px;
    }
}
</style>