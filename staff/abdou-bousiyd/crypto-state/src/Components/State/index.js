import React, { Component } from 'react';
import CryproItem from '../CryptoItem/'
import getState from '../../logic/get-state'
import TopBar from '../topBar/'
import toggleFavs from '../../logic/toggle-favs'
import retrieveUser from '../../logic/retrive-user'
import './state.sass';

class State extends Component{
    state = {cryptos: [], error: null, user: {}}

    componentDidMount(){
        getState()
        .then(function(cryptos){//debugger

          this.setState({cryptos})
          const cryptoNames = cryptos.map(crypto => crypto.id)

          const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${cryptoNames.join()}`)

          // console.log(pricesWs)

          pricesWs.onmessage = (msg) => {

              const cryptosPrices = JSON.parse(msg.data)
              // console.log(cryptosPrices, 222)

              const keys = Object.keys(cryptosPrices)

              
              cryptos.forEach(crypto => {//debugger
                keys.forEach(key => {

                  if(key === crypto.id) {

                    if (cryptosPrices[key] > crypto.priceUsd) {
                      crypto.classStyle = 'green'
                    } else {
                      crypto.classStyle = 'red'
                    }

                    crypto.priceUsd = cryptosPrices[key]

                  } else {
                    crypto.classStyle = ''
                  }
                })
              })

              this.setState({cryptos})
          }

          this.getUser()
        }.bind(this))
      }

      handleToggleFavs = (symbol) => {
        toggleFavs(symbol)
        .then(() => {
          this.getUser()
        })
      }

      getUser = () => {//debugger
          retrieveUser()
          .then(user => {
            console.log(user)
              this.setState({user})
            })
      }

      render() {

        const {
            state: {cryptos, user, error}, handleToggleFavs} = this

          return( 
              <div className="cryptos_state"> 
                <TopBar />
                <div className="cryptos_state__list">
                  <div className="cryptos_state__list__options">
                    <div>Rank</div>
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
//   {id: 'c', name: 'khalid', nota: 2}
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
