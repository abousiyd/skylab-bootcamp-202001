function searchCrypto(query) {
    
    return fetch(`https://api.coincap.io/v2/assets/${query.toLowerCase()}`)
    .then( function(response) {
        if(response.status === 200) {
            return response.json()
        }
    })
    
    .then(function (response) {
        if(response){
            return response.data
        }
    } )

    .catch(function(error) {
        throw new Error(error)
    })
}

export default searchCrypto;