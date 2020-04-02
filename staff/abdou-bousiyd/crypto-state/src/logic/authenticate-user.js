
/**
 * Autenticate user
 * @param {string} username
 * @param {string} password
 * @returns {promise}
 */
function authenticateUser(username, password) {

    if(!username) throw Error('username should be defined')
    if(!password) throw Error('password should be defined')

    // una fuctona que llama ase misnma
    return ( async () => {

        try {
            const response = await fetch('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        const { status } = response

        if (status === 200) {
            const { token } = await response.json()
            localStorage.setItem("token", token);
            return {
                status: 'ok',
                token
            }
        }



        if (status === 401) {
            return await response.json()
        }

        // if (status >= 400 && status < 500) {
        //     const { error } =  response.json()
        //         if (error) {
        //             return {
        //                 error: error.message
        //             }
        //         }

        //         // throw new error('credenciales incorrectas')

        //     // throw new Error(error)
        // }
        // return {
        //     error: 'server error'
        // }
        // throw new Error('server error')
        } catch(error) {
            throw new Error(error)
            // return error
        }

    })()
}
export default authenticateUser;

