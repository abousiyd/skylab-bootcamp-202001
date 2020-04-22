import React, { Component } from 'react';
import CryproItem from '../CryptoItem/'
import getState from '../../logic/get-state'
import TopBar from '../TopBar/'
import toggleFavs from '../../logic/toggle-favs'
import retrieveUser from '../../logic/retrieve-user'
import './state.sass';

class State extends Component{
    state = {cryptos: [], error: null, user: {}}

    componentDidMount(){
      this.getUser()
      getState()
      .then(function(cryptos){
        if(!cryptos){
          return
        }
        this.setState({cryptos})

        const cryptoNames = cryptos.map(crypto => crypto.id)

        const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${cryptoNames.join()}`)

        pricesWs.onmessage = (msg) => {

            const cryptosPrices = JSON.parse(msg.data)

            const keys = Object.keys(cryptosPrices)
  
            cryptos.forEach(crypto => {
              keys.forEach(key => {

                if(key === crypto.id) {

                  if (cryptosPrices[key] > crypto.priceUsd) {
                    crypto.classStyle = 'state-container--green'
                  } else {
                    crypto.classStyle = 'state-container--red'
                  }
                  crypto.priceUsd = cryptosPrices[key]
                } else {
                  crypto.classStyle = ''
                }
              })
            })

            this.setState({cryptos})
        }
      }.bind(this))
      }

      handleToggleFavs = (symbol) => {
        const {state: {user: {favs = []}}} = this
        toggleFavs(symbol, favs)
        .then(() => {
          this.getUser()
        })
      }

      getUser = () => {
          retrieveUser()
          .then(user => {
              if (user) {
                this.setState({user})
              }
            })
      }

      render() {

        const {
            state: {cryptos, user, error}, handleToggleFavs} = this

          return( 
            <>
            <TopBar />
              <div className="cryptos-state"> 
                <div className="cryptos-state__list">
                  <div className="cryptos-state__list__options">
                    <div>Name</div>
                    <div>Price</div>
                    <div>Change (24hs)</div>
                    <div>Actions</div>
                  </div>
                  {!!cryptos.length && cryptos.map(crypto => <CryproItem user={user} handleToggleFavs={handleToggleFavs} cryptoInfo={crypto}/>)}
                </div>
              </div> 
              </>
            )
      }

}

export default State;
