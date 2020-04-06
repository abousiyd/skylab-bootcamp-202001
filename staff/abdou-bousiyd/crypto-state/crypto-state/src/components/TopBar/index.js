import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import retrieveUser from '../../logic/retrive-user'
import context from '../../logic/context'
import './topBar.sass'

class TopBar extends Component{
    state = { user: {}}

    componentDidMount() {
        retrieveUser().then(user => {
            if(user) this.setState({user})
          })
    }
            
    handleClick = () => {
        const burger = document.querySelector('.top-bar__burger')
        const nav = document.querySelector('.top-bar__links')
        const navButtons = document.querySelectorAll('.top-bar__links li')

        // console.log('this is:', this);
        nav.classList.toggle('nav-active')

        navButtons.forEach( (link, index) => {
            if(link.style.animation){
                link.style.animation = ''
            }else{
                link.style.animation = `navLinksFade 0.5s ease forwards ${index / 7 + 0.5}s`
            }
        })

        burger.classList.toggle('top-bar__burger__item--toggle')

    }

    
    render() {

        const {state: {user: {username}}, props: {history}} = this

        return(
            <nav className="top-bar">
                <div className="top-bar__logo">
                    <h4 onClick={() => history.push('/home')}>CRYPTO-STATE</h4>
                </div>

                <ul className="top-bar__links">

                    <li className="top-bar__links__item"  onClick={() => history.push('/state')}>
                        State
                    </li>

                    <li className="top-bar__links__item" onClick={() => history.push('/news')}>
                        News
                    </li>

                    <li className="top-bar__links__item" onClick={() => history.push('/profile')}>
                        Profile
                    </li>

                    <li className="top-bar__links__item">
                        <span className=""  onClick={() => context.logout()}>Logout</span>
                    </li>
                </ul>

                <div className="top-bar__burger" onClick={this.handleClick}>
                    <div className="top-bar__burger__item top-bar__burger__item--line1"></div>
                    <div className="top-bar__burger__item top-bar__burger__item--line2"></div>
                    <div className="top-bar__burger__item top-bar__burger__item--line3"></div>
                </div>
            </nav>
        )
    }
}

export default withRouter(TopBar);