import React, {Component} from 'react';
import authenticateUser from '../../logic/authenticate-user'
import Alert from '../Alert'
import './login.sass';

class Login extends Component {

    state = {error: null}
    
    handleOnSubmit = (event) => {
        event.preventDefault()
        
        const usernameValue = event.target.username.value
        const passwordValue = event.target.password.value
    
     this.handleLogin(usernameValue, passwordValue)

    }

    handleOnToRegister = (event) => {
        event.preventDefault()
        console.log(this.props)
        this.props.history.push('/register')
    }

    handleLogin = (email, password) => {
        authenticateUser(email, password)
        .then(function( response ){
            if(response.status === 'ok') {
                this.props.history.push('/state')
            }else{
                const { error } = response;
                if (error) {
                    this.setState({error})

                    setTimeout(() => {
                    this.setState({error: null})

                    }, 5000)
                }
            }
        }.bind(this))
    }
    
    render() {

        const {state: {error}, handleOnToRegister, handleOnSubmit} = this

        return <div className="login-container">
            <form className="login" onSubmit={handleOnSubmit}>
                <h2>ACCOUNT LOGIN</h2>

                {error && <Alert message={error} />}


                {/* <label>Email</label> */}
               <input type="text" name="username" placeholder="username" />

                {/* <label>Password</label> */}
                <input type="password" name="password" placeholder="password" />

                <button >Login</button>

                <a href="" onClick={handleOnToRegister}>Register</a>

            </form>
        </div>
    }

}

export default Login;