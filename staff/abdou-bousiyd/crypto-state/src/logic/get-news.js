import retrieveUser from './retrive-user'


function getUserNews(lang, date){
    
    return retrieveUser()
    .then((user) => {//debugger
        const {favs = []} = user
        
        const allUserNews = favs.map(fav => {
            return getNews(fav, lang, date)
        })


        return Promise.all(allUserNews)
        .then(articles => {
            return favs.map((fav, i) => {
                console.log(fav, i)
                return {
                    crypto: fav,
                    articles: articles[i]
                }
            })
        })
    })
}

function getNews(crypto, lang, date) {
    
    return fetch(`http://newsapi.org/v2/everything?q=${crypto}&from=${date}&sortBy=publishedAt&language=${lang}&apiKey=d0a7ac0517eb4859b314aad7fc871aa3`)
    // return fetch(`http://newsapi.org/v2/everything?q=${crypto}&from=${date}&sortBy=publishedAt&language=${lang}&apiKey=6536e5e78af745e39a17546246240a27`)
    .then( function(response) {
        if(response.status === 200) {
            return response.json()
        }
    })
    .then(function (response) {
        console.log(response.articles)
        return response.articles
    })

    .catch(function(error) {
        console.log(error)
    })
}

export {getNews} // 
export default getUserNews;