import {getNews} from './get-news'

test('should return news of bitcoin', async () => {
    const news = await getNews('bitcoin', 'en', null)
    expect(news.length).toBeGreaterThan(1)
});
