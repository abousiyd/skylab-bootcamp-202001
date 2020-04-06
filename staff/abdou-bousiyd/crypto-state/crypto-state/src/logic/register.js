function register(name, surname, username, password) {

    if(!name) throw Error('name should be defined')
    if(!surname) throw Error('surname should be defined')
    if(!username) throw Error('username should be defined')
    if(!password) throw Error('password should be defined')

    return ( async () => {
        try {
        
        const response = await fetch('https://skylabcoders.herokuapp.com/api/v2/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, username, password })
        })
        const { status } = response

        if (status === 201) {
            return 'ok'
        }


        if (status === 401 || status === 409) {
            const {error} = await response.json()
            throw new Error(error)
        }


    } catch(error) {
        throw new Error(error)
        // return error
    }
    })()
}
export default register;

