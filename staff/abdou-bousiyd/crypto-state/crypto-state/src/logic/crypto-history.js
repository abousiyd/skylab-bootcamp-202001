
function cryptoHistory(cryptoQuery) {
    
    return fetch(`https://api.coincap.io/v2/assets/${cryptoQuery}/history?interval=d1`)
    .then( function(response) {
        if(response.status === 200 || response.status === 404) {
            return response.json()
        }
    })
    .then(function (response) {
        if (response.error) {
            throw new Error(response.error)
        }
        return response.data
    })

    .catch(function(error) {
        throw new Error(error.message)
    })
}

export default cryptoHistory;