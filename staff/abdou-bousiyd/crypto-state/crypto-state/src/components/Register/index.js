import React, { Component } from 'react';
import register from '../../logic/register'
import Alert from '../Alert'
import './register.sass';

class Register extends Component {

    state = {error: null, alert: null}

    handleOnSubmit = (event) => {
        event.preventDefault()
        
        const name = event.target.name.value
        const surname = event.target.surname.value
        const username = event.target.username.value
        const password = event.target.password.value

        this.handleRegister(name, surname, username, password)
    }

    handleOnToLogin = (event) => {
        event.preventDefault()
        console.log(this.props)
        this.props.history.push('/login')
    }

    handleRegister = (name, surname, username, password) => {
        try{
            register(name, surname, username, password)
            .then(response => {
                if(response === 'ok') {
                    this.props.history.push('/login')
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
        const {state: {error, alert}, handleOnToLogin, handleOnSubmit} = this

        return <div className="auth-container">
        <form className="auth-container__form" onSubmit={handleOnSubmit}>
        {/* {error && <Alert message={error} />} */}
        {alert && alert}

            <h2 className="auth-container__form__title">Sign-up</h2>
                <input className="auth-container__form__input" type="text" name="name" placeholder="name" />
                <input className="auth-container__form__input" type="text" name="surname" placeholder="surname" />
                <input className="auth-container__form__input" type="text" name="username" placeholder="username" />
                <input className="auth-container__form__input" type="password" name="password" placeholder="password" />
            <button className="auth-container__form__button">Register</button>
            <span className="auth-container__form__back" onClick={handleOnToLogin}>Login</span>
        </form>
    </div>
    }

}

export default Register;