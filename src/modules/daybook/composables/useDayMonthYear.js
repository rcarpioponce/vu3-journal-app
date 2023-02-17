
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

const useDayMonthYear = (date) => {
    return {
        day: date.getDate(),
        month: months[date.getMonth()],
        year: date.getFullYear(),
        yearDay: days[date.getDay()]
    }
}

export default useDayMonthYear