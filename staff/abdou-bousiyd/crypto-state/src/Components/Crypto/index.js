import React from 'react';
import {withRouter} from 'react-router-dom'
import './crypto.sass';


function Crypto(props){
    
    const {cryptoInfo: {priceUsd, name, changePercent24Hr, symbol, id}, full} = props

    // console.log(props)
    
    let divClassName = ''
    // modificador 
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

// cuando le doy click a more me lleva a una nueva ruta que es crypto/nameMoneda y
// el nombre de la monida es dinameco puede ser tron o bitcoi... y me carga otra ruta 
// en el componente me busco el nombre de la moneda props.match.{crypto: btn} y cargo el 
// componente crypto info que cuando se monta en el componentedidmount me busca la crypto que tengo en la url 
//y me setea el estado , en caso exeto me muesta y si no impremo error y rederecciono al /home
