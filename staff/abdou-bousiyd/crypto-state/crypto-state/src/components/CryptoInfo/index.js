import React, { Component } from 'react';
import searchCrypto from '../../logic/search-crypto'
import Crypto from '../Crypto'
import CryptoChart from '../Chart/'
import TopBar from '../TopBar/'
import './CryptoInfo.sass'

class CryptoInfo extends Component{
    state = { crypto: null, error: null }
    
    componentDidMount() {
        const {props: {match: {params: {crypto}}}} = this
        
        searchCrypto(crypto)
        .then(function(crypto){
          if(crypto){
            this.setState({crypto})
          }else{
              this.setState({error:'crypto not found'})
              setTimeout( () => {
                  this.props.history.push('/home') 
              }, 3000)
            }
        }.bind(this))
    }

    render() {
        const {
            state: {crypto, error},
            props: {match: {params: {crypto: cryptoQuery}}}
            
          } = this

        return(
            <div className="crypto_info">
                <TopBar />
                
                {crypto && <Crypto cryptoInfo={crypto} full />}
                {error && <p>{error}</p>}

                <div className="crypto_info__chart">
                    <CryptoChart className="crypto_info__chart__graphic" cryptoQuery={cryptoQuery} />
                </div>
            </div>
        )
    }
}

export default CryptoInfo;