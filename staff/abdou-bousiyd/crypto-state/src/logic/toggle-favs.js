function toggleFavs(symbol) {
    const token = localStorage.getItem('token')

    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload)) // base64

    if (!sub) throw new Error('no user id in token')


    return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/${sub}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })


    .then( function(response) {
        if(response.status === 200) {
            return response.json()
        }
    })
    // manejar otros errores de la api 400-417 client error. 505 server error
    .then(function (user) {
        // console.log(user)
        const {favs =  [] } = user
        favs.toggle(symbol)


        return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'PATCH',
        body: JSON.stringify({favs}),
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        })
    
    .then( function(response) {
        if(response.status === 204) {
            return 'Favorites updated'
        }
    })
    .catch(function(error) {
        console.log(error)
    })
    })

    .catch(function(error) {
        console.log(error)
    })
}

export default toggleFavs;