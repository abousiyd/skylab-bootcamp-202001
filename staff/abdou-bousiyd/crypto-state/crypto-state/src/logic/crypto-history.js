
function cryptoHistory(cryptoQuery) {
    
    //devuelve una promisa.
    return fetch(`https://api.coincap.io/v2/assets/${cryptoQuery}/history?interval=d1`)
    .then( function(response) {
        if(response.status === 200) {
            // console.log(response)
            return response.json()
        }
    })
    .then(function (response) {
        return response.data
    })

    .catch(function(error) {
        // console.log(error)
    })
}

export default cryptoHistory;