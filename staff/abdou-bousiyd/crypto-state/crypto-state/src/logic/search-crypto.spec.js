import searchCrypto from './search-crypto'

describe('Search crypto', () => {
    it('should return cryptos by query', async () => {

        const crypto = await searchCrypto('tron')
        expect(crypto.symbol).toEqual('TRX')
    });
    
    it('should return undefined on none result', async () => {
    
        const crypto = await searchCrypto('lorem')
        expect(crypto).toBeUndefined()
    });   
})