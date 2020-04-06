import React from 'react';
import './Carousel.sass'

function Carousel(props) {

        const {children} = props

        return(
            <section className="banner">
                <div className="banner__content">
                    {children}
                    <p className="banner__content__title" id="text"></p>
                </div>
            </section>
        )
}

export default Carousel;