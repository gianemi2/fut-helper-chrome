const Tasks = {
    searchByID: () => {
        // Se non è ancora stato creato segna false
        const searchByID = document.querySelector('.js-search-by-id')
        if (searchByID) {
            console.log('ESISTE', searchByID)
            return true
        } else {
            console.log('NULL', searchByID)
            return false
        }
    },
    cooldown: false
}
export default Tasks