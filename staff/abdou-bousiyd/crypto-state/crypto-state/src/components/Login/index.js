import React, {Component} from 'react';
import authenticateUser from '../../logic/authenticate-user'
import Alert from '../Alert'
import './login.sass';

class Login extends Component {

    state = {error: null, alert: null}
    
    handleOnSubmit = (event) => {
        event.preventDefault()
        const usernameValue = event.target.username.value
        const passwordValue = event.target.password.value
    
     this.handleLogin(usernameValue, passwordValue)

    }

    handleOnToRegister = (event) => {
        event.preventDefault()
        this.props.history.push('/register')
    }

    handleLogin = (email, password) => {
        try{
            authenticateUser(email, password)
            .then(status => {
                if(status === 200) {
                    this.props.history.push('/state')
                }
            }).catch(error => {
                this.setState({alert: <Alert error message={error.message} />})
                setTimeout( () => {
                    this.setState({alert: null})
                }, 4000 )
            })
        }catch(error){
            this.setState({alert: <Alert error message={error.message} />})
            setTimeout( () => {
                this.setState({alert: null})
            }, 4000 )
        }
    }
    
    render() {

        const {state: {error, alert}, handleOnToRegister, handleOnSubmit} = this

        return <div className="auth-container">
            <form className="auth-container__form" onSubmit={handleOnSubmit}>
                {alert && alert}
                <h2 className="auth-container__form__title">LOGIN</h2>
               <input className="auth-container__form__input" type="text" name="username" placeholder="username" />
                <input className="auth-container__form__input" type="password" name="password" placeholder="password" />
                <button className="auth-container__form__button" >Login</button>
                <span className="auth-container__form__back" onClick={handleOnToRegister}>Register</span>
            </form>
        </div>
    }

}

export default Login;