function Register({ onToLogin, handleRegister }) {

    const handleOnSubmit = (event) => {
        event.preventDefault()
        
        const name = event.target.name.value
        const surname = event.target.surname.value
        const username = event.target.username.value
        const password = event.target.password.value

        handleRegister(name, surname, username, password)
    }

    const handleOnToLogin = (event) => {
        event.preventDefault()

        onToLogin()
    }


    return <form className="register" onSubmit={handleOnSubmit}>
        <h2>Sign-up</h2>
        
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="surname" placeholder="surname" />
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button>Register</button>
        <a href="" onClick={handleOnToLogin}>Login</a>
    </form>
}