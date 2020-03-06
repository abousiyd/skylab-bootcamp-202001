const { Component } = React

class App extends Component {

    state = { view: 'search', user: null, items: null, error: null, query: null, ducks: null, logout: null}

    componentDidMount() {
        const {token} = sessionStorage

        if(token) {
            this.getUser(token)
        }else{
            console.log('no tengo token')
            //this.handleLogout()
        }
    }

    handleLogout = ()  => {
        console.log(this)
        this.setState({ view: 'login', user: null })
    }

    handleError({ message }) {
        this.setState({ error: message })
        setTimeout(() => {
            this.setState({ error: null })
        }, 3000)
    }

    getUser(token) {
        retrieveUser(token, (error, user) => {
            if (error) {
                this.handleError(error)
                console.log('no tienes token')
                return this.handleLogout()
            }
            sessionStorage.token = token
            this.setState({ view: 'search', user })
        })
    }

    handleLogin = (username, password) => { 
        try {
            authenticateUser(username, password, (error, token) => {
                if (error) {
                    this.handleError(error)
                } else {
                    this.getUser(token)
                }
            })
        } catch (error) {
            this.handleError(error)
        }
    }

    handleRegister = (name, surname, username, password) => {
        try {
            registerUser(name, surname, username, password, error => {
                if (error) {
                    this.handleError(error)
                } else
                    this.setState({ view: 'login' })
            })
        } catch (error) {
            this.handleError(error)
        }
    }

    handleSearch = (query) => {
        try{
            searchDucks(query, (error, ducks) => {
                if (error) {
                    return this.handleError(error)
                }
                this.setState({ view: 'search', ducks, query, error: ducks.length ? undefined : 'No results'})
            })
        }catch (error) {
            this.handleError(error)
        }
    }

    handleUpdateProduct = (duck, update) => {
        try{
            const {token} = sessionStorage
            if(!token) return this.handleLogout()

            updateProduct(token, duck, update, (error, user) => {
                if(error) {return this.handleError()}
                this.setState({user})
            })
        }catch (error) {
            this.handleError(error)
        }
    }

    onToRegister = () => {
        this.setState({ view: 'register' })
    }
    onToLogin = () => {
        this.setState({ view: 'login' })
    }
    onToMyProducts = () => {
        this.setState({ view: 'myProducts' })
    }
    render() {
        const {
            state: {
                view, error, user, query, ducks
            }, 
            handleLogin, 
            onToRegister,
            handleRegister,
            onToLogin,
            handleSearch,
            handleUpdateProduct,
            onToMyProducts,
            handleLogout

        } = this

        return(
            <main>
                <header>
                    {view === 'search' && <Logout user={user} handleLogout={handleLogout} /> }
                    {user && <h2 className="nameUser" ><i className="material-icons">face</i>Welcome {user.username}</h2>}
                    {view === 'search' && <Search query={query} handleSearch={handleSearch}/>}
                    {view === 'search' && <Cart user={user} onToMyProducts={onToMyProducts} />}
                </header>

                
                {view === 'login' && <Login handleLogin={handleLogin} onToRegister={onToRegister} />}
                {view === 'register' && <Register handleRegister={handleRegister} onToLogin={onToLogin}/>}
                {view === 'myProducts' && user && <MyProducts ducks={ducks} user={user} handleUpdateProduct={handleUpdateProduct} />}
                {view === 'search' && ducks && <Ducks user={user} ducks={ducks} handleUpdateProduct={handleUpdateProduct} />}               
                {error && <p>{error}</p>}
            </main>
        )
    }

}