
function googl(query, callback) {
    var xhr = new XMLHttpRequest

    xhr.open('GET', 'https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=' + query)

    xhr.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
            var doc = new DOMParser().parseFromString(this.responseText,'text/html')

            var items = doc.querySelectorAll('div.g')
            
            var results = []

            for(var i = 0; i < items.length; i++) {
                item = items[i]

                var title = item.querySelector('h3.LC20lb')

                if(title) {
                    var result = {}

                    result.title = title.innerText.trim()

                    var rating = item.querySelector('.slp.f');

                    if (rating)
                        result.rating = rating.innerText.trim();                    

                    var description = item.querySelector('span.st');

                    if (description)
                        result.description = description.innerText.trim();

                    var link = item.querySelector('.rc>.r>a');

                    if (link)
                        result.link = link.href.trim();

                        results.push(result)
                        // console.log(results)
                        // console.log(items)
                }
            }
            callback(results)
        }
    }
    xhr.send()
}

