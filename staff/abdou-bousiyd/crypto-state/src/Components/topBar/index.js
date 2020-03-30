import React, { Component } from 'react';
import retrieveUser from '../../logic/retrive-user'
import logout from '../../logic/logout'


import './topBar.sass'

class TopBar extends Component{
    state = { user: {}}

    componentDidMount() {
        retrieveUser().then(user => {
            this.setState({user})
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

        const {state: {user: {username}}} = this

        return(
            <nav>
                <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet"></link>
                <div className="logo">
                    <h4>CRYPTO-STATE</h4>
                </div>

                <ul className="navLinks">
                    <li>
                        <a href="#">Articles</a>
                    </li>

                    <li>
                        <a href="#">Cryptos</a>
                    </li>

                    <li>
                        <a href="#">{username}</a>
                    </li>

                    <li>
                        <a href="#" onClick={logout}>Logout</a>
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

export default TopBar;