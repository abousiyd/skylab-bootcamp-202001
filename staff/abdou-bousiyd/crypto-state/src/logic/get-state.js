
function getState() {
    //devuelve una promisa.
    return fetch('https://api.coincap.io/v2/assets?limit=20')
    .then( function(response) {
        if(response.status === 200) {
            // console.log(response)
            return response.json()
        }
    })
    .then(function (response) {
        // console.log(response.data)
        return response.data
    })

    .catch(function(error) {
        console.log(error)
    })
        //manejar errores desconocidos
}

export default getState;