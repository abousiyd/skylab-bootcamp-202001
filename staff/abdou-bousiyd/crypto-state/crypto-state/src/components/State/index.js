import React, { Component } from 'react';
import CryproItem from '../CryptoItem/'
import getState from '../../logic/get-state'
import TopBar from '../TopBar/'
import toggleFavs from '../../logic/toggle-favs'
import retrieveUser from '../../logic/retrive-user'
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

            
            cryptos.forEach(crypto => {//debugger
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
              <div className="cryptos-state"> 
                <TopBar />
                <div className="cryptos-state__list">
                  <div className="cryptos-state__list__options">
                    <div>Name</div>
                    <div>Price</div>
                    <div>Change (24hs)</div>
                    <div>Actions</div>
                  </div>
                  {cryptos.length && cryptos.map(crypto => <CryproItem user={user} handleToggleFavs={handleToggleFavs} cryptoInfo={crypto}/>)}
                </div>
              </div> 
          )
      }

}

export default State;


// const users = [
//   {id: 'a', name: 'victor', nota: 9},
//   {id: 'b', name: 'abdel', nota: 10},
//   {id: 'c', name: 'marc', nota: 2}
// ] 

// const usersNewData = {
//   a: 5,
//   c: 8
// }

// const keys = Object.keys(usersNewData)

// users.forEach(user => {
//   keys.forEach(key => {
//       console.log(user.id, key)
//       if (user.id === key) {
//          user.nota = usersNewData[key]
//       }
//   })
// })

// console.log(users)

// crypto.classStyle = (cryptosPrices[key] > crypto.priceUsd) ? 'green' : 'red'
