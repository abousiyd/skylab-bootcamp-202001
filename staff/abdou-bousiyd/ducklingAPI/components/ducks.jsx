function Ducks({ducks, handleUpdateProduct, user}) {
    return <ul className="results">
        {ducks.map(duck => <Duck key={duck.id} user={user} duck={duck} handleUpdateProduct={handleUpdateProduct} />)}

    </ul>
}
