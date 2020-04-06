import React, { Component} from "react";
import TopBar from '../TopBar/'
import getUserNews from "../../logic/get-news";
import retrieveUser from '../../logic/retrive-user'
import Acrtile from "../Article";
import Alert from '../Alert'

import "./News.sass";

class News extends Component {
  state = { news: [], error: null, user: {}, lang: 'en', date: null };

  componentDidMount() {
    retrieveUser().then(user => {
      if (user) {
        this.setState({user}, () => this.handleGetUserNews())
      }
    })
  }

  handleGetUserNews = () => {
    const {state: { lang, date, user: {favs = []} }} = this;
    getUserNews(lang, favs, date)
    .then(
      function(news) {
        if (news) {
          this.setState({ news });
        }
      }.bind(this)
    );
  }

  setLang = (lang) => {
    this.setState({lang}, () => this.handleGetUserNews())
  }

  setDate = (event) => {
    const date = event.target.value
    this.setState({date}, () => this.handleGetUserNews())
  }


  render() {
    const {
      state: { news },
      setLang,
      setDate
    } = this;

    return (
      <div className="news">
        <TopBar />
       <section>
       <div className="news__langlist">
          <div className="news__langlist__lang">
            <span onClick={() => setLang('en')}>EN</span>
            <span onClick={() => setLang('es')}>ES</span>
            <span onClick={() => setLang('fr')}>FR</span>
          </div>

          <div className="news__langlist__date">
            <span>From</span> 
            <input type="date" onChange={setDate} />
          </div>
        </div>

        <div className="news__alert">
          {!news.length && <Alert message="please subscribe to your favorite currencies." />}
        </div>

        {news.map(section => {
            return (
              <>
                <h1 className="news__title">{section.crypto}</h1>
                <div className="news__section">
                  {section.articles && section.articles.map(article => (
                    <Acrtile article={article} />
                  ))}
                </div>
              </>
            );
          })}
       </section>
      </div>
    );
  }
}

export default News;
