function toggleVehicle(token, id, callback) {
    if (typeof token !== 'string') throw new TypeError('token ' + token + ' is not a string')
    if (!token.trim()) throw new Error('token is empty');
    if (typeof callback !== 'function') throw new TypeError('callback ' + callback + ' is not a function')
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')

    const [, payload,] = token.split(".")
    const conversion = atob(payload) //base 64 a base normal
    const payloadObject = JSON.parse(conversion)  //pasant a objecte

    call("https://skylabcoders.herokuapp.com/api/v2/users/" + payloadObject.sub, {  //sub es id
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    }, response => {
        const content = JSON.parse(response.content)
        if (response instanceof Error) return callback(response)
        if (response.status !== 200) callback(new Error(content.error))
        if (response.status === 200) {
            let favorites = []
            if (content.favs) {
                const arrFav = content.favs
                const indexId = arrFav.findIndex(value => value === id)
                if (indexId !== -1) {
                    arrFav.splice(indexId, 1)
                    favorites = arrFav

                } else {
                    favorites = arrFav
                    favorites.push(id)
                }
            }else{
                favorites.push(id)
            }
            
            call("https://skylabcoders.herokuapp.com/api/v2/users", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({favs: favorites})
            }, response => {
                if (response.content) {
                    const content = JSON.parse(response.content)
                    if (response instanceof Error) return callback(response)
                    if (response.status !== 204) callback(new Error(content.error))
                }
                if (response.status === 204) callback()


            })


        }
    })
}