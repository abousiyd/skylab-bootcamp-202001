function updateUser(user, token, callback) {

    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    // if (typeof password !== 'string') throw new TypeError(`surname ${surname} is not a string`)

    
    call('https://skylabcoders.herokuapp.com/api/v2/users/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(user)
    }, response => {
        if(response instanceof Error) callback(response)

        if(response.status === 204) callback(response)
    } )
}