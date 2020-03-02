function searchDucks(query, callback) {
    if(typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    //if(typeof callback !== 'function') throw new TypeError(`${query} is not a function`)ç

    call(`https://duckling-api.herokuapp.com/api/search?q=${query}`, undefined, (error, response) => {
        if(error) return callback(error)
        if(response.status === 201) {
            const ducks = JSON.parse(response.content) 
            callback(undefined, ducks)
        }
        if(response.status === 400) {
            const {error} = JSON.parse(response.content)
            if(error) return callback(new Error(error))
        }
    })
}