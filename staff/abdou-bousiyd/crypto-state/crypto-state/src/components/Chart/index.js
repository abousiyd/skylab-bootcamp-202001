import React, { Component } from "react";
import {Line} from 'react-chartjs-2';
import cryptoHistory from "../../logic/crypto-history";
import moment from 'moment'
import './chart.sass'

class CryptoChart extends Component {
  state = { crypto: null, error: null, data: null };
  // const {  }
  // console.log(props.match.params.crypto)

  componentDidMount() {
    const {cryptoQuery} = this.props

    cryptoHistory(cryptoQuery).then(
      function(crypto) {
        if (crypto) {
          const labels = []
          const prices = []

            crypto.forEach((_cryptoInfo) => {

            // var test = moment.duration(_cryptoInfo.time); 
            // var y = tempTime.hours() + test.minutes();
          
              const time = moment.unix(_cryptoInfo.time/1000).format("DD MMM")

              labels.push(time)
              prices.push(Number(_cryptoInfo.priceUsd))
          });  
          

          const data = {
            labels, 
            datasets: [
              {
                label: cryptoQuery,
                data: prices,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(0,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                pointBorderColor: 'blue',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 10,
                pointHoverBackgroundColor: 'crimson',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 15,
              }
            ]
          };
          this.setState({data})

        } else {
          this.setState({ error: "crypto not found" });

          setTimeout(() => {
            this.props.history.push("/home");
          }, 3000);
        }
      }.bind(this)
    );
  }

  render() {
    const {
      state: {data, error }
    } = this;


    const opt = {
      
      maintainAspectRatio: true,
      scales: {
          xAxes: [{
              ticks: {
                  display: true
              }
          }]
      }
    }

    
    return (
      <div className="chart">
        {data && <Line data={data} options={opt} />}
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default CryptoChart;
