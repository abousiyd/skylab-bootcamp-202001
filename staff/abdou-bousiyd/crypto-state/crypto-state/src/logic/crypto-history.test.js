import cryptoHistory from './crypto-history'


test('should return crypto history prices', async () => {
    const cryptos = await cryptoHistory('bitcoin')
    expect(cryptos.length).toBeGreaterThan(1)
});

test('should return 0 when crypto name is wrong', async () => {
    const cryptos = await cryptoHistory('random')
    expect(cryptos).toBeUndefined()
});

test('should return 0 when crypto is not defined', async () => {
    const cryptos = await cryptoHistory()
    expect(cryptos.length).toEqual(0)
});