import React, { Component } from 'react';
import photo from './img/photo.png'
import './Landing.sass'

class Landing extends Component{
            
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

        return(
        <div className="landing"> 
            <nav>
                <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet"></link>
                <div className="logo">
                    <h4>CRYPTO-STATE</h4>
                </div>

                <ul className="navLinks">
                    <li>
                        <a href="#">Home</a>
                    </li>

                    <li>
                        <a href="#">About</a>
                    </li>

                    <li>
                        <a href="#">Project</a>
                    </li>

                    <li>
                        <a href="#">Perfil</a>
                    </li>
                </ul>

                <span>Sign-Up</span>

                <div className="burger" onClick={this.handleClick}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>

            <div className="landingBanner">
                <div className="landingBanner__app-text">
                    <h1>our besic thesis for bitcoin </h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        Nisi modi quas magni adipisci molestias sequi unde cupiditate.
                        Pariatur aliquam? Perferendis, molestias consequatur. Earum dignissimos?
                    </p>
                </div>
                <div className="app-picture">
                    <img src={photo}  />
                </div>
            </div>
        </div>
        )
    }
}

export default Landing;