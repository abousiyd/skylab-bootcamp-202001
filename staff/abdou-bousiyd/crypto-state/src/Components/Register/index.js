import React, { Component } from 'react';
import register from '../../logic/register'
import './register.sass';
import Alert from '../Alert'


class Register extends Component {

    state = {error: null}

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
        register(name, surname, username, password)
        .then(function( response ){
            if(response === 'ok') {
                this.props.history.push('/login')
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
        const {state: {error}, handleOnToLogin, handleOnSubmit} = this

        return <div className="register-container">
        <form className="register" onSubmit={handleOnSubmit}>
        {error && <Alert message={error} />}

            <h2>Sign-up</h2>
                <input type="text" name="name" placeholder="name" />
                <input type="text" name="surname" placeholder="surname" />
                <input type="text" name="username" placeholder="username" />
                <input type="password" name="password" placeholder="password" />
            {/* </div> */}
            <button>Register</button>
            <a href="" onClick={handleOnToLogin}>Login</a>
        </form>
    </div>
    }

}

export default Register;