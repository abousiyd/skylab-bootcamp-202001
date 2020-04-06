import context from './context'

function updateProfil(name, surname, username, oldPassword, password) {

    if(!name) throw Error('name should be defined')
    if(!surname) throw Error('surname should be defined')
    if(!username) throw Error('username should be defined')
    if(!oldPassword) throw Error('oldPassword should be defined')
    if(!password) throw Error('password should be defined')

    return fetch('https://skylabcoders.herokuapp.com/api/v2/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` },
        body: JSON.stringify({name, surname, username, oldPassword, password})
    })
    
    .then(response => {
        const {status} = response

        if (status === 204) {
            return 'ok'
        }

        if(status === 401) {
            return response.json()
        }
    })

    .then(response => {
        if(response.error){
            throw new Error(response.error)
        }else{
            return response
        }
    })

    .catch(error => {
        throw new Error(error.message)
    })
}
export default updateProfil.bind(context);

