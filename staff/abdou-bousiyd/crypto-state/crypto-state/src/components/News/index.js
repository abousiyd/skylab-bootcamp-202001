import React, { Component} from "react";
import TopBar from '../TopBar/'
import getUserNews from "../../logic/get-news";
import retrieveUser from '../../logic/retrieve-user'
import Acrtile from "../Article";
import Alert from '../Alert'

import "./News.sass";

class News extends Component {
  state = { news: [], error: null, user: {}, lang: 'en', date: null };

  componentDidMount() {
    retrieveUser()
    .then(user => {
      if (user) {
        this.setState({user}, () => this.handleGetUserNews())
      }
    })
  }

  handleGetUserNews = () => {
    const {state: { lang, date, user: {favs = []} }} = this;
    getUserNews(lang, favs, date)
    .then(function(news) {
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
    const {state: { news },setLang,setDate} = this;

    return (
      <>
      <TopBar />
      <div className="news">
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

        {!news.length && <div className="news__alert">
          <Alert className="news__alert__message" message="please subscribe to your favorite currencies." error/>
          </div>}

        {news.map(section => {
            return (
              <>
                <h1 className="news__title">{section.crypto}</h1>
                {section.articles && !!section.articles.length ? (
                <div className="news__section"> {section.articles.map(article => ( <Acrtile article={article} /> ))}</div>
                ): ( <div className="news__notfound">
                  <div className="news__alert"> <Alert message={`No news for: ${section.crypto}`} error/></div>
                </div>
                )}
              </>
            );
          })}
      </div>
      </>
    );
  }
}

export default News;
