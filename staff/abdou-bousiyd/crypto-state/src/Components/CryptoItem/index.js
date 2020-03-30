import React from 'react';
import {withRouter} from 'react-router-dom'
import './CryptoItem.sass';


function CryptoItem(props){
       
    const {cryptoInfo: {rank, priceUsd, name, changePercent24Hr, symbol, id, classStyle}, handleToggleFavs, user: {favs = []}} = props
    return(
        <div className={`cryptoItem_container cryptoItem_container--${classStyle}`}>
            <p className="cryptoItem_container__rank">{rank}</p>

            <div className="cryptoItem_container__list">
                <img className="cryptoItem_container__list__photo" alt="crypto_image" src={`https://static.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}  />
                <div className="cryptoItem_container__list__title">
                    <h1 className="cryptoItem_container__list__title__name">{name}</h1>
                    <p>{symbol}</p>
                </div>

                <div className="cryptoItem_container__list__status">
                    <p>{parseFloat(priceUsd).toFixed(4)} $ </p>
                </div>

                <div className="cryptoItem_container__list__status">
                    <p>{parseFloat(changePercent24Hr).toFixed(2) }</p>
                </div>
            </div>
            <div className="cryptoItem_container__btns">
                {<button className="cryptoItem_container__btns__more" onClick={()=> props.history.push(`/crypto/${id.toLowerCase()}`)}><span>More</span></button>}
                
                
                {<button className="cryptoItem_container__btns__more" onClick={()=> handleToggleFavs(name.toLowerCase())}>
                <span>{favs.includes(name.toLowerCase()) ? 'DisLike' : 'Like' }</span>
                </button>}
            
            </div>

        </div>
    )
}
export default withRouter(CryptoItem);