import context from './context'
import addMethodToggleToArray from '../utils/array.prototype.toggle'

addMethodToggleToArray()

function toggleFavs(symbol, favs) {

    const [header, payload, signature] = this.token.split('.')
    
    if (!header || !payload || !signature) throw new Error('invalid token')

    favs.toggle(symbol)

    return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'PATCH',
        body: JSON.stringify({favs}),
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
            }
        })
    
    .then( function(response) {
        if(response.status === 204) {
            return 'Favorites updated'
        }
    })
}

export default toggleFavs.bind(context);