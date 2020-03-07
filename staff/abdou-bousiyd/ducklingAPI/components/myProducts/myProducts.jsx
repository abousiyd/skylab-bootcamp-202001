function MyProducts({user,  handleUpdateProduct}) {
    const {myCart: {products}} = user
    
        let repitedDuck = []
        
    return <ul className="results">
    {products.map(duck => {
        const { id, title, imageUrl, price} = duck
        
        let totalProducts = 0

        if (user) {
            const {myCart: {products}} = user
            const productsById = products.filter(product => product.id === id)
            totalProducts = productsById.length
        }

        if (repitedDuck.includes(duck.id)) {
            return null
        }
    
        repitedDuck.push(duck.id)
        return <li className="results__item">
            
        <div className="titls">

            <h3>{title}</h3>
                <span onClick={() =>  handleUpdateProduct(duck, 'add')}><i className="material-icons">add_shopping_cart</i></span>
                <span onClick={() =>  handleUpdateProduct(duck, 'remove')}><i className="material-icons">remove_shopping_cart</i></span>
                <span> {totalProducts}</span>
        </div>
    
        <div className="itemCart">
            <img className="imgCart" src={imageUrl} onClick={() => handleDetail(id)}/>
            <div className="textCart">
                <p>{title} Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ipsum alias animi doloribus at recusandae reprehenderit nobis debitis nulla dolore sequi incidunt beatae officia, excepturi rem illum ad eos consequatur!</p>
                <div className="priceItem">
                    <p>{price}</p>
                    <p className="">Precio total { parseInt(price)  * parseInt(totalProducts)} €</p>                
                </div>
            </div>

            <div className="buttons">
                <button onClick={() => handleUpdateProduct(duck, 'removeAllById')}>Eliminar</button>

            </div>
        </div>
    </li>
    })}
    </ul>
    }
