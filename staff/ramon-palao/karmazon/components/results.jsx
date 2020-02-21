function Results({ results, onItemClick, onToggleFav, favs }) {
    return <ul className="results">
        {results.map(item => <Item item={item} onClick={onItemClick} onToggleFav={onToggleFav} isFavorite={favs.find(value => value === item.id)}/>)}
    </ul>
}
