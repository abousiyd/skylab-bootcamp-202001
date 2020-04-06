function getUserNews(lang, favs, date) {

    // apiKey=6536e5e78af745e39a17546246240a27

    if(!lang) throw Error('lang should be defined')
    if(!(favs instanceof Array)) throw Error('favs should be an array')

    const allUserNews = favs.map(crypto => {
        return fetch(`http://newsapi.org/v2/everything?q=${crypto}&from=${date}&sortBy=publishedAt&language=${lang}&apiKey=d0a7ac0517eb4859b314aad7fc871aa3`)
        .then(response => {
            if(response.status === 200) {
                return response.json()
            }
        })
        .then(response => {
            if (response) {
                return response.articles
            } else {
                return []
            }
        })
    })
    
    return Promise.all(allUserNews)
    .then(articles => {
        return favs.map((fav, i) => {
            return {
                crypto: fav,
                articles: articles[i]
            }
        })
    })
}

export default getUserNews;
