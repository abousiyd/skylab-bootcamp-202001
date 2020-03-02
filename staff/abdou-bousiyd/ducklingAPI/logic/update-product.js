function updateProduct(token, duck, update, callback) {
    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)
        // if (typeof idProduct !== 'string') throw new TypeError(`id ${idProduct} is not a string`)

        if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

        const [header, payload, signature] = token.split('.')
        if (!header || !payload || !signature) throw new Error('invalid token')
    
        const { sub } = JSON.parse(atob(payload)) // base64
    
        if (!sub) throw new Error('no user id in token')
    
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
            console.log(data, 5555)
    
            // enviar info del user sin error
            callback(undefined, { name, surname, username, myCart })

            //---
            if (error) return callback(error)

            const {myCart: {id, products}} = data
           // const { myCart: {id, products} } = user
    
            // si hay el id la elimino y si no hay la añado
            if(update === 'add') {
                products.push(duck)
            }
    
            if(update === 'remove') {
                products.remove(duck.id)
            }
    
            const newCart = {myCart:{id, products}}
    
            call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // enviar el objeto favs en formato string
                body: JSON.stringify(newCart)
            }, (error, response) => {//la respons debe llevar solo un status
                if (error) return callback(error)
    
                if (response.content) {
                    // el metodo patch no me devuelve conten devuelve estado 204
                    //en caso de que hay content ERRor
                    const { error } = JSON.parse(response.content)
    
                    if (error) return callback(new Error(error))
                }
                callback(undefined, {...data, ...newCart})
            })
        })
    }