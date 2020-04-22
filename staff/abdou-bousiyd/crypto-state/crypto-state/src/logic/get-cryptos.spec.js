import getCryptos from './get-cryptos'

describe('Get cryptos', () => {
    it('should return limit of 50 cryptos', async () => {
        const cryptos = await getCryptos()
        
        expect(cryptos.length).toEqual(50)
        expect(cryptos[0].id).toEqual("bitcoin")
    });
})
