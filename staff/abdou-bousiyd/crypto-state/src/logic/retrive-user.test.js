import register from './register'
import retriveUser from './retrive-user'

let name = 'name-' + Math.random()
let surname = 'surname-' + Math.random()
let username = 'username-' + Math.random()
let password = "123456"

beforeAll(async () => {
    await register(name, surname, username, password)
});


test('should retrive user', async () => {
    
    try {
        await retriveUser(name, surname, username, password)
      } catch (e) {
        expect(e.message).toMatch(`token null is not a string`);
      }

});