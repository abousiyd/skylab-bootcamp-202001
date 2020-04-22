import context from './context'

function retrieveUser() {

    const [header, payload, signature] = this.token.split('.')

    if (!header || !payload || !signature) {
        throw Error('Invalid token')
    }

    const { sub } = JSON.parse(atob(payload)) 

    if (!sub) throw new Error('no user id in token')

    return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/${sub}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${this.token}` }
    })

    .then(response => {
        if(response.status === 200) {
            return response.json()
        }
        this.clear()
        throw Error('Invalid token');
    })
    .then(user =>  {
        return user
    })
    .catch(error => {
        this.clear()
        throw new Error(error.message)
    })
}

export default retrieveUser.bind(context);