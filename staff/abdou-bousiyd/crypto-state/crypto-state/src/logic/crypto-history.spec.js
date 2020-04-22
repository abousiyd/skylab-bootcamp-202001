import cryptoHistory from './crypto-history'


describe('Crypto history', () => {

    it('should return crypto history prices', async () => {
        const cryptos = await cryptoHistory('bitcoin', 'd1')
        expect(cryptos.length).toBeGreaterThan(1)

        const dateAndPrice = cryptos[0];

        expect(typeof Number(dateAndPrice.priceUsd)).toEqual('number')
        expect(typeof dateAndPrice.time).toEqual('number')
        expect(typeof dateAndPrice.date).toEqual('string')

    });
    
    it('should return 0 when crypto name is wrong', async () => {
        return cryptoHistory('not_found_crypto', 'd1')
        .catch(err => {
            expect(err.message).toBe('unable to find asset: not_found_crypto') 
        }) 
    });

    it('should fail on none Query', () => {
        expect(() =>
        cryptoHistory()
            ).toThrowError(Error, 'Query should be string')
        });

      it('should fail on none graph', () => {
        expect(() =>
        cryptoHistory()
          ).toThrowError(Error, 'graph should be string')
      });

})
