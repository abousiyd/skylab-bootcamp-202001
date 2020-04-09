import cryptoHistory from './crypto-history'


describe('Crypto history', () => {

    it('should return crypto history prices', async () => {
        const cryptos = await cryptoHistory('bitcoin')
        expect(cryptos.length).toBeGreaterThan(1)

        const dateAndPrice = cryptos[0];

        expect(typeof Number(dateAndPrice.priceUsd)).toEqual('number')
        expect(typeof dateAndPrice.time).toEqual('number')
        expect(typeof dateAndPrice.date).toEqual('string')
    });
    
    it('should return 0 when crypto name is wrong', async () => {
        try {
            await cryptoHistory('not_found_crypto')
          } catch (error) {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('unable to find asset: not_found_crypto')
          }
    });
    
    it('should return 0 when crypto is not defined', async () => {
        const cryptos = await cryptoHistory()
        expect(cryptos.length).toEqual(0)
    });

})
