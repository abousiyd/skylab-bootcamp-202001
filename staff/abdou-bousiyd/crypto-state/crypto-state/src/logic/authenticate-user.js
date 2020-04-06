import context from './context'

/**
 * Autenticate user
 * @param {string} username
 * @param {string} password
 * @returns {Promise<string>} token from storage
 */
function authenticateUser(username, password) {

    if(!username) throw Error('username should be defined')
    if(!password) throw Error('password should be defined')

    return ( async () => {

        const response = await fetch('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

        const { status } = response

        if (status === 200) {
            const { token } = await response.json()
            this.token = token;
            return status
        }

        if (status === 401) {
            const {error} = await response.json()
            throw new Error(error)
        }

        throw new Error('server error')
    })()
}
export default authenticateUser.bind(context);

