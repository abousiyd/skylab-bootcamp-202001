function Duck(props) {
    const { duck, user, handleUpdateProduct} = props
    const { id, title, imageUrl, price} = duck
    let totalProducts = 0
    if (user) {
        const {myCart: {products}} = user
        const productsById = products.filter(product => product.id === id)
        totalProducts = productsById.length 
    }

    return <li className="results--item item">
        <h3>
            {title}
        </h3>
        <span onClick={() => handleUpdateProduct(duck, 'add')}><i className="material-icons">add</i></span>
        <span onClick={() => handleUpdateProduct(duck, 'remove')}><i className="material-icons">remove</i></span>

        <h3> {totalProducts && totalProducts}</h3>
        <img src={imageUrl}/>
        <span>{price} €</span>
    </li>
}