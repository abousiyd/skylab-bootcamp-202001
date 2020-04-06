import addMethodToggleToArray from './array.prototype.toggle'

addMethodToggleToArray()

test('should push to array', () => {
    let cryptos = ['bitcoin'];
    cryptos.toggle('tron')

    expect(cryptos.length).toEqual(2)
    expect(cryptos[1]).toEqual('tron')
});

test('should remove from array', () => {
    let cryptos = ['bitcoin'];
    cryptos.toggle('bitcoin')

    expect(cryptos.length).toEqual(0)
});