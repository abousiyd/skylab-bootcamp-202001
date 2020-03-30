import React, { Component } from 'react';
import './Footer.sass'

class Footer extends Component{
            
    
    render() {

        return(
            <>
            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"></link>
            
            <div className="body-content">
                <h1>CRYPTO-STATE</h1>
                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>

            <div className="footer">
                <h2>QUICK LINKS</h2>
                <div className="border"></div>
                <ul>
                    <a href="#">Home</a>
                    <a href="#">State</a>
                    <a href="#">Project</a>
                    <a href="#">About</a>
                    <a href="#">Profil</a>
                </ul>
            </div>

            <div className="footer-items">
                <h2>CRYPTO</h2>
                <div className="border"></div>
                <ul>
                    <a href="#">Bitcoin</a>
                    <a href="#">Tron</a>
                    <a href="#">Litcoin</a>
                    <a href="#">Nem</a>
                    <a href="#">Zcash</a>
                </ul>
            </div>

            <div className="footer-items">
                <h2>Contact Us</h2>
                <div className="border"></div>
                <ul>
                    <li><i className="far fa-map-marker" aria="true"></i>Calle Skylab Coder Academy</li>
                    <li><i className="far fa-phone" aria="true"></i>+34 56 58 85 52</li>
                    <li><i className="far fa-enveloper" aria="true"></i>Social-Support@code.cat</li>
                </ul>
                <div className="social-media">
                    <li><i className="far fa-facebook" aria="true"></i></li>
                    <li><i className="far fa-twitter" aria="true"></i></li>
                    <li><i className="far fa-instagram" aria="true"></i></li>
                    <li><i className="far fa-google-plus" aria="true"></i></li>
                </div>
                <div>opyright &copy; Computers & Codes 2020. all rights
                    C
                </div>
            </div>

            </>
        )
    }
}

export default Footer;