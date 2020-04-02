import React, { Component} from "react";
import TopBar from '../topBar/'
import getUserNews from "../../logic/get-news";
import Acrtile from "../Article";

import "./News.sass";

class News extends Component {
  state = { news: [], error: null, user: {}, lang: 'en', date: null };

  componentDidMount() {
    this.handleGetUserNews()
  }

  handleGetUserNews = () => {
    const {state: { lang, date }} = this;
    getUserNews(lang, date)
    .then(
      function(news) {
        console.log(news);
        this.setState({ news });

        //   this.getUser()
      }.bind(this)
    );
  }

  setLang = (lang) => {
    this.setState({lang}, () => this.handleGetUserNews)
  }

  setDate = (event) => {
    const date = event.target.value
    this.setState({date}, this.handleGetUserNews)
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
        {news &&
          news.map(section => {
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
      </div>
    );
  }
}

export default News;
