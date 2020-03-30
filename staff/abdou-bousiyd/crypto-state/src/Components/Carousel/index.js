import React from 'react';
import './Carousel.sass'

function Carousel(props) {

        const {children} = props

        return(
            <section className="banner">
                <div className="banner__content">
                    {children}
                    <p id="text"></p>
                </div>
            </section>
        )
}

export default Carousel;