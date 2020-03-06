// 
function Search({query, handleSearch}) {

    const  handleOnSubmit = (event) => {
        event.preventDefault()

        const newQuery = event.target.query.value

        handleSearch(newQuery)
    }
    return <form className="search" onSubmit={handleOnSubmit}>
                <h2 className="titleSearch">Search</h2>
                <input type="text" name="query" placeholder="criteria" defaultValue={query, 'green'} />
                <button type="submit">Search</button>
            </form>
}