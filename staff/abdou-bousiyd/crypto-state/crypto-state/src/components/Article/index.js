import React from 'react';
import {withRouter} from 'react-router-dom'
import './Article.sass';


function Article(props){
    
    const {article: {author, title, description, url, urlToImage, publishedAt}} = props
    
    return(
            <div className="container__card">
                <div className="container__card__imageContainer">
                    <a href={url} target="_blank"> 
                        <img className="container__card__imageContainer__img" alt="article_image" src={urlToImage} /> 
                    </a>
                   <div className="container__card__imageContainer__author">
                    <span>{author} - {publishedAt && publishedAt.slice(0, 10)}</span>
                   </div>
                </div>

            <div className="container__card__body">
                <p className="container__card__body__description">
                    <b className="container__card__body__description__title-body" >{title  && title.slice(0, 100)}</b>
                    <br />
                    <br />
                    { description && description.slice(0, 100) }... 
                </p>
            </div>
            </div>
    )
}
export default withRouter(Article);