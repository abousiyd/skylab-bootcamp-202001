import register from './register'
import autenticate from './authenticate-user'
import toggleFavs from './toggle-favs'
import context from './context'

let name 
let surname 
let username
let password 

beforeAll(async () => {
    name = 'name-' + Math.random()
    surname = 'surname-' + Math.random()
    username = 'username-' + Math.random()
    password = 'password-' + Math.random()
    await register(name, surname, username, password)
    await autenticate(username, password)
});

test('should add crypto to favorite', () => {
    
  return toggleFavs('tron', [])
    .then((message) => {
        expect(message).toEqual('Favorites updated')
    })
});

test('should fail when token is invalid', async () => {
    let invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTUzNmVlMTJlOTNkZDAwMTVmNGIyZWYiLCJpYXQiOjE1ODU5MzQ5ODYsImV4cCI6MTU4NTkzODU4Nn0.H9P-NLsOwQjRmkofBzJYv0pRvM_tI0gl_pMyTovhTOk'
    
    context.token = invalidToken
  
    try {
      await toggleFavs('tron', [])
    } catch (error) {
      expect(error.message).toEqual('Invalid token');
    }
  });