import getState from './get-state'

describe('Get state', () => {

    it('should return limit of 25 cryptos', async () => {
    
        const cryptos = await getState()
        expect(cryptos.length).toEqual(25)
        expect(cryptos[0].id).toEqual("bitcoin")
    
    });

})
