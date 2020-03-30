
function getCryptos() {//debugger
    
    //devuelve una promisa.
    return fetch('https://api.coincap.io/v2/assets?limit=50')
    .then( function(response) {
        if(response.status === 200) {
            // console.log(response)
            return response.json()
        }
    })
    
    .then(function (response) {//debugger
        // console.log(response.data)
        return response.data
    })

    .catch(function(error) {
        console.log(error)
    })
        //manejar errores desconocidos
}

export default getCryptos;