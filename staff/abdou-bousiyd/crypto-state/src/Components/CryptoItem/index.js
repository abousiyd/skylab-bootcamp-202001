import React from 'react';
import {withRouter} from 'react-router-dom'
import './CryptoItem.sass';


function CryptoItem(props){
       
    const {cryptoInfo: {rank, priceUsd, name, changePercent24Hr, symbol, id, classStyle}, handleToggleFavs, user: {favs = []}} = props

    const percent = parseFloat(changePercent24Hr).toFixed(2)

    const stateClassName = Math.sign(percent) === -1 ? 'red' : 'green'

    return(
        <div className={`cryptoItem_container cryptoItem_container--${classStyle}`}>
            
            <div className="cryptoItem_container__item cryptoItem_container__list">
                <img className="cryptoItem_container__list__photo" alt="crypto_image" src={`https://static.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}  />
                <div className="cryptoItem_container__list__title">
                    <h4 className="cryptoItem_container__list__title__name">{name}</h4>
                    {/* <p>{symbol}</p> */}
                </div>
            </div>

            <div className="cryptoItem_container__item cryptoItem_container__list__status">
                <p>{parseFloat(priceUsd).toFixed(4)}$ </p>
            </div>

            <div className={`cryptoItem_container__item cryptoItem_container__list__percent cryptoItem_container__list__percent--${stateClassName}`}>
                {parseFloat(changePercent24Hr).toFixed(2)}%
            </div>

            <div className="cryptoItem_container__item cryptoItem_container__btns">
                {<span className="cryptoItem_container__btns__more material-icons" onClick={()=> props.history.push(`/crypto/${id.toLowerCase()}`)}>timeline</span>}
                {<span className="cryptoItem_container__btns__more material-icons" onClick={()=> handleToggleFavs(name.toLowerCase())}>{favs.includes(name.toLowerCase()) ? <p>visibility_off</p> : <p>add_alert</p> }</span>}
            </div>

        </div>
    )
}
export default withRouter(CryptoItem);