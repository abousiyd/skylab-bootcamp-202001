import React, { Component } from 'react'
import updateProfile from '../../logic/update-profile'
import retriveUser from '../../logic/retrive-user'
import TopBar from '../TopBar'
import Alert from '../Alert'
import './Profile.sass'


class Profile extends Component {

    state = {user: {}, alert: null}

    componentDidMount = () => {
        retriveUser()
        .then(user => {
            if(user) {
                this.setState({user})
            }
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        
        const name = event.target.name.value
        const surname = event.target.surname.value
        const username = event.target.username.value
        const oldPassword = event.target.oldPassword.value
        const password = event.target.password.value

        this.handleupdateProfil(name, surname, username, oldPassword, password)
    }

    handleupdateProfil = (name, surname, username, oldPassword, password) => {
        try{
            updateProfile(name, surname, username, oldPassword, password)
            .then( response =>{
                if(response === 'ok') {
                    this.setState({alert: <Alert message='User updated successfully' />})
    
                    setTimeout( () => {
                        this.setState({alert: null})
                    }, 4000 )
                }
            }).catch( (error) => {
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


    
    render(){
        const {handleOnSubmit, state: {user: {name, surname, username}, alert}} = this
        return(<>
                <TopBar />
                {alert && alert}
                <form className="form-container" onSubmit={handleOnSubmit}>
                    <div className="form-container__form">
                        < h3 className="form-container__form__title" > Profile</h3 >
                        <input className="form-container__form__input" type="text" name="name" defaultValue={name}/>
                        <input className="form-container__form__input" type="text" name="surname" defaultValue={surname}/>
                        <input className="form-container__form__input" type="text" name="username" defaultValue={username}/>
                        <input className="form-container__form__input" type="password" name="oldPassword" placeholder="OldPassword"/>
                        <input className="form-container__form__input" type="password" name="password" placeholder="Password"/>
                        <button className="form-container__form__button" type="submit">Update your Profile</button>
                    </div>
                </form>
            </>
            
        );
    }
}
export default Profile;