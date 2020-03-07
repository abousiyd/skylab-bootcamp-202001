function Cart({user, onToMyProducts}) {

    let totalProductos = 0
    if(user) {
        const {myCart: {products}} = user
        totalProductos = products.length
    }

    return <div  className="cartShop">
                <i onClick={onToMyProducts} className="material-icons">shopping_cart</i>
                <p> {totalProductos} items</p>
            </div>
}