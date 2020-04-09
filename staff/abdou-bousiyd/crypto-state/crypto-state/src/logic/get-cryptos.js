function getCryptos() {

    return fetch('https://api.coincap.io/v2/assets?limit=50')
    .then( function(response) {
        if(response.status === 200) {
            return response.json()
        }
    })
    .then(function (response) {
        return response.data
    })
    .catch(function(error) {
        throw new Error(error.message)
    })
}

export default getCryptos;