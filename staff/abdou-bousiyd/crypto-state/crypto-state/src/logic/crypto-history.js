
function cryptoHistory(cryptoQuery, graph) {

    if(!graph) throw Error('graph should be defined')
    
    return fetch(`https://api.coincap.io/v2/assets/${cryptoQuery}/history?interval=${graph}`)
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