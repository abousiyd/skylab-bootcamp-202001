function Login({ handleLogin, onToRegister }){
    const handleOnSubmit = (event) => {
        event.preventDefault()
        
        const usernameValue = event.target.username.value
        const passwordValue = event.target.password.value
    
        handleLogin(usernameValue, passwordValue)

    }

    const handleOnToRegister = (event) => {
        event.preventDefault()

        onToRegister()
    }
    
    return <form className="login" onSubmit={handleOnSubmit}>
        <h2>Sign-in</h2>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />

        <button>Login</button>

        <a href="" onClick={handleOnToRegister}>Register</a>

    </form>
}