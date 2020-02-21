function retrieveUser(token, callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')

    const [header, payload, signature] = token.split('.')

    if (!header || !payload || !signature) throw new Error('invalid token')

    const payloadObject = JSON.parse(atob(payload))
    const { sub } = payloadObject

    if (!sub) throw new Error('no user id in token')

    call('https://skylabcoders.herokuapp.com/api/v2/users/' + sub, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    }, (error, response) => {

        if (error) return callback(error)

        const user = JSON.parse(response.content)
        const { error: _error } = user


        if (_error) return callback(new Error(_error))

        callback(undefined, user)
    })

}