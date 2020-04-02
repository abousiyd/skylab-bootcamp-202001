import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import retrieveUser from '../../logic/retrive-user'
import logout from '../../logic/logout'
import './topBar.sass'

class TopBar extends Component{
    state = { user: {}}

    componentDidMount() {
        retrieveUser().then(user => {
            if(user) this.setState({user})
          })
    }
            
    handleClick = () => {
        const burger = document.querySelector('.burger')
        const nav = document.querySelector('.navLinks')
        const navButtons = document.querySelectorAll('.navLinks li')

        console.log('this is:', this);
        nav.classList.toggle('nav-active')

        navButtons.forEach( (link, index) => {
            if(link.style.animation){
                link.style.animation = ''
            }else{
                link.style.animation = `navLinksFade 0.5s ease forwards ${index / 7 + 0.5}s`
            }
        })

        burger.classList.toggle('toggle')

    }
    
    render() {

        const {state: {user: {username}}, props: {history}} = this

        return(
            <nav>
                <div className="logo">
                    <h4>CRYPTO-STATE</h4>
                </div>

                <ul className="navLinks">
                    <li>
                        <span onClick={() => history.push('/home')}>Home</span>
                    </li>

                    <li>
                        <span onClick={() => history.push('/state')}>State</span>
                    </li>

                    <li>
                        <span onClick={() => history.push('/news')}>News</span>
                    </li>

                    <li>
                        <span className=""  onClick={logout}>Logout</span>
                    </li>
                </ul>

                <div className="burger" onClick={this.handleClick}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        )
    }
}

export default withRouter(TopBar);