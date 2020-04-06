import React, { Component } from 'react';
import getCryptos from '../../logic/get-cryptos'
import SearchCrypto from '../navBar/'
import Crypto from '../Crypto'
import searchCrypto from '../../logic/search-crypto'
import retrieveUser from '../../logic/retrive-user'
import Carousel from '../Carousel'
import './cryptos.sass'

class Cryptos extends Component {

    state = {
      cryptos: [],
      crypto: null,
      allCryptos: [], 
      cryptoPrices: {
        bitcoin: 0,
        ethereum: 0,
        tether: 0
      }, 
    error: null ,
    user: {}
  }

    componentDidMount(){ //debugger
      const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,tether')

      pricesWs.onmessage = (msg) => {//debugger
        // console.log(msg.data)
          const cryptoPrices = JSON.parse(msg.data)
            this.setState({cryptoPrices: {
              ...this.state.cryptoPrices,
              ...cryptoPrices
            }})
      }

      this.callCryptos()
      this.typeEffect()
      this.getUser()
    }

    getUser = () => {
      try {
        retrieveUser()
        .then(user => {
          if(user) this.setState({user})
          })
      }catch(error){
        
      }
    }

    getRandomCrypto = () => {
      const {state: {allCryptos}} = this;
      const shuffledCryptos =  allCryptos.sort(() => Math.random()  -0.3);
      const cryptos = shuffledCryptos.splice(0, 5)
      this.setState({cryptos})
    }

    callCryptos = () => {//debugger
      getCryptos()
      .then((allCryptos) => {  
        
        this.setState({allCryptos})
        setInterval(this.getRandomCrypto, 7000)

      })
    }

    handleSearch = (query) => {
      searchCrypto(query)
      .then(function(crypto){
        if(crypto){
          this.setState({crypto})
        }else{
          this.setState({error:'crypto not found'})
          setTimeout(() => {
            this.setState({error: null})
          }, 5000)
        }
      }.bind(this))
    }

    typeEffect = () => {
      var i = 0;
      var txt = 'Bienvenidos a crypto-state.';
  
      function typeWriter() {
          if (i < txt.length) {
              let element = document.getElementById("title")
              if (element) {
                element.innerHTML += txt.charAt(i);
                i++;
              }
              setTimeout(typeWriter, 70);
          }
      }
      typeWriter()
  }

  render() {
    // history
    const {
      state: {cryptos, crypto, error, user, cryptoPrices: {bitcoin,ethereum,tether}},
      handleSearch
    } = this
    
    return (
      <div className="cryptos-container">
          <SearchCrypto handleSearch={handleSearch} user={user}/>
    
          <Carousel>
            {error && <p>{error}</p>}
            {!cryptos.length && <div className="cryptos-container__donut"></div>}

            {!crypto && !!cryptos.length &&  <h1 className="title" id="title"> </h1>}
            
            {crypto && <Crypto cryptoInfo={crypto}/>}
          
              <div className="cryptos-container__cryptos" id="cryptos">
                {!!cryptos.length && cryptos.map(crypto => <Crypto  cryptoInfo={crypto}/>)}
              </div>
          </Carousel>
        
          <div className='cryptos-container__socket'>
              <div className="cryptos-container__socket__crypto">
                <img className="cryptos_container__socket__img" src="https://static.coincap.io/assets/icons/btc@2x.png" alt="crypto_image"></img>
                <p className="cryptos-container__socket__text">{bitcoin}$</p>
              </div>
              <div className="cryptos-container__socket__crypto">
                <img className="cryptos-container__socket__img" src="https://static.coincap.io/assets/icons/eth@2x.png" alt="crypto_image"></img>
                <p className="cryptos-container__socket__text">{ethereum}$</p>
              </div>
              <div className="cryptos-container__socket__crypto">
                <img className="cryptos-container__socket__img" src="https://static.coincap.io/assets/icons/usdt@2x.png" alt="crypto_image"></img>
                <p className="cryptos-container__socket__text">{tether}$</p>
              </div>
            </div>
        </div>
    );
  }
}

export default Cryptos;
