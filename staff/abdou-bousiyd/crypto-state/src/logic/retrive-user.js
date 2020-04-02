import logout from './logout'

function retrieveUser() {
    const token = localStorage.getItem('token') 

    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) {
        logout()
    }

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
       return logout()
    })
    .then(function (user) {
        return user
    })
    .catch(function() {
        logout()
    })
}

export default retrieveUser;