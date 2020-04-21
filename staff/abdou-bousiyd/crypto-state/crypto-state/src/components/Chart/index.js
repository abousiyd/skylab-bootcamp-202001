import React, { Component } from "react";
import {Line} from 'react-chartjs-2';
import cryptoHistory from "../../logic/crypto-history";
import moment from 'moment'
import './chart.sass'

class CryptoChart extends Component {
  state = { crypto: null, error: null, data: null, graph: 'h12' };


  componentDidMount() {
    const {cryptoQuery} = this.props
    const {state: { graph }} = this;

    cryptoHistory(cryptoQuery, graph)
    .then(function(crypto) {
        if (crypto) {
          const labels = []
          const prices = []

            crypto.forEach((_cryptoInfo) => {
          
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

  setGraph = (graph) => {
    this.setState({graph}, () => this.componentDidMount())
  }

  render() {
    const {state: { data, error, graph },setGraph} = this
    const opt = { 
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        xAxes: [{
          ticks: {
                  display: true
              }
          }]
      }
    }
    console.log(graph)
    
    return (
      <>
      <div className="graph">
          <button className={`graph__interval ${graph === 'm1' && 'graph__interval--orange'}`} onClick={() => setGraph('m1')}>m1</button>
          <button className={`graph__interval ${graph === 'm5' && 'graph__interval--orange'}`} onClick={() => setGraph('m5')}>m5</button>
          <button className={`graph__interval ${graph === 'm15' && 'graph__interval--orange'}`} onClick={() => setGraph('m15')}>m15</button>
          <button className={`graph__interval ${graph === 'm30' && 'graph__interval--orange'}`} onClick={() => setGraph('m30')}>m30</button>
          <button className={`graph__interval ${graph === 'h1' && 'graph__interval--orange'}`} onClick={() => setGraph('h1')}>h1</button>
          <button className={`graph__interval ${graph === 'h2' && 'graph__interval--orange'}`} onClick={() => setGraph('h2')}>h2</button>
          <button className={`graph__interval ${graph === 'h12' && 'graph__interval--orange'}`} onClick={() => setGraph('h12')}>h12</button>
          <button className={`graph__interval ${graph === 'd1' && 'graph__interval--orange'}`} onClick={() => setGraph('d1')}>d1</button>
      </div>
      <div className="chart">
        {data && <Line data={data} options={opt} />}
        {error && <p>{error}</p>}
      </div>
      </>
    );
  }
}

export default CryptoChart;

