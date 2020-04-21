import React from 'react';
import {withRouter} from 'react-router-dom'
import './crypto.sass';


function Crypto(props){
    
    const {cryptoInfo: {priceUsd, name, changePercent24Hr, symbol, id}, full} = props

    let divClassName = ''
    if(full){
        divClassName = 'crypto--full'
    }

    const percent = parseFloat(changePercent24Hr).toFixed(2)
    const price = parseFloat(priceUsd).toFixed(2)

    const stateClassName = Math.sign(percent) === -1 ? 'red' : 'green'

    return( 
        <div className={`crypto ${divClassName}`}>

            <div onClick={()=> props.history.push(`/crypto/${id.toLowerCase()}`)}>
            
            <img src={`https://static.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}  alt="crypto_image"/>
            <h4 className="crypto__title">{name}</h4>

            <div className="crypto__info">
                <p className={`crypto__info__state crypto__info__state--${stateClassName}`}>{percent}%</p>
                <p className="crypto__info__price">{price}$</p>
            </div>
            </div>       
        </div>
    )
}
export default withRouter(Crypto);
