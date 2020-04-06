import getState from './get-state'


test('should return limit of 20 cryptos', async () => {

    const cryptos = await getState()
    expect(cryptos.length).toEqual(25)
});