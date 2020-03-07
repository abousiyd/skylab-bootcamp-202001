function Duck(props) {
    //function duck({ duck: {id, title, imageUrl, price}, user, handleToggleProduct, handleDetail })
    const { duck, user, handleUpdateProduct} = props
    const { id, title, imageUrl, price} = duck
    let totalProducts = 0
    if (user) {
        const {myCart: {products}} = user
        const productsById = products.filter(product => product.id === id)
        totalProducts = productsById.length 
    }

    return <li className="results--item item">
        <div className="results__item">
            <h3>{title}</h3>
            <span onClick={() => handleUpdateProduct(duck, 'add')}><i className="material-icons">add_shopping_cart</i></span>
            <span onClick={() => handleUpdateProduct(duck, 'remove')}><i className="material-icons">remove_shopping_cart</i></span>
            <h3> {totalProducts && totalProducts}</h3>
        </div>
        <img className="results__img" src={imageUrl}/>
        <span className="results__price">{price} €</span>
    </li>
}