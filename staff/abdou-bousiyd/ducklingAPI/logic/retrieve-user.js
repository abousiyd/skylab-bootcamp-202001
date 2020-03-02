
function retrieveUser(token, callback) {
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload)) // base64

    if (!sub) throw new Error('no user id in token')

    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${sub}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    }, (error, response) => {
        if (error) return callback(error)
        
        const data = JSON.parse(response.content)
        const { error: _error } = data

        if (_error) return callback(new Error(_error))

        // destructuro la informacion del usuario y si no tiene favs le asigna un array vacio por defecto
        const { name, surname, username, myCart = {id: sub, products: [] }} = data

        // enviar info del user sin error
        callback(undefined, { name, surname, username, myCart })
    })
}