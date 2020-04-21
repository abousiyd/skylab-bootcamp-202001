import getUserNews from './get-news'

describe('Get news', () => {

    it('should return articles of tron and bitcoin', () => {
        return getUserNews('en', ['bitcoin', 'tron'])
            .then((articles) => {
                expect(articles.length).toBe(2)
                expect(articles[0].crypto).toBe('bitcoin')
                expect(articles[1].crypto).toBe('tron')
            })
    });
    
    it('should return 0 articles when favorites is empty', () => {
        return getUserNews('en', [])
            .then((articles) => {
                expect(articles.length).toBe(0)
            })
    });
    
    it('should fail on none username', async () => {
        try {
          await getUserNews()
        } catch (error) {
          expect(error.message).toBe('lang should be defined');
        }
      });
    
    it('should fail on none password', async () => {
        try {
            await getUserNews('es')
        } catch (error) {
            expect(error.message).toBe('favs should be an array');
        }
    });
      
})
