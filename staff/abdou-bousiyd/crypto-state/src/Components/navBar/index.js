
import React from 'react';
import './NavBar.sass'

function SearchCrypto({query, handleSearch}) {
            
    const handleClick = () => {
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

    const handleOnSubmit = (event) => {
        event.preventDefault()

        const query = event.target.query.value

        if(query === '') return 

        handleSearch(query)
        console.log(query)

    }
    
        return(

                <div className="nav">
                    <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet"></link>
                    <div className="logo">
                        <h4>CRYPTO-STATE</h4>
                    </div>

                    <form className="nav-Search" onSubmit={handleOnSubmit}>
                        <input type="text" name="query" placeholder="criteria" defaultValue={query} />
                        <button type="submit">Search</button>
                    </form>

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

                        <li>
                            <a href="#">Logout</a>
                            <span class="material-icons">exit_to_app</span>
                        </li>
                    </ul>

                    <div className="burger" onClick={handleClick}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>


    )
}

export default SearchCrypto;