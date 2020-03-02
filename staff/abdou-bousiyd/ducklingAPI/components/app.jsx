const { Component } = React

class App extends Component {

    state = { view: null, user: null, error: null, query: null, ducks: null}

    componentDidMount() {
        const {token} = sessionStorage

        if(token) {
            this.getUser(token)
        }else{
            console.log('no tengo token')
            this.handleLogout()
        }
    }

    handleLogout() {
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
                console.log(ducks)
                if (error) {
                    return this.handleError(error)
                }
                this.setState({ view: 'search', ducks, query, error: ducks.length ? undefined : 'No results'})
            })
            console.log('buscando')
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
            handleUpdateProduct

        } = this

        return(
            <main>
                {user && <h2>Welcome {user.username}.</h2>}
                {view === 'login' && <Login handleLogin={handleLogin} onToRegister={onToRegister} />}
                {view === 'register' && <Register handleRegister={handleRegister} onToLogin={onToLogin}/>}
                {view === 'search' && <Search query={query} handleSearch={handleSearch}/>}

                {view === 'search' && ducks && <Ducks user={user} ducks={ducks} handleUpdateProduct={handleUpdateProduct} />}


                {view === 'search' && ducks && <Ducks user={user} ducks={ducks}  />}

                {error && <p>{error}</p>}
            </main>
        )
    }

}