import register from './register'
import autenticate from './authenticate-user'
import retriveUser from './retrive-user'
import context from './context'

describe('Retrive user', () => {

  let name 
  let surname 
  let username
  let password 
  
  beforeEach(async () => {
      name = 'name-' + Math.random()
      surname = 'surname-' + Math.random()
      username = 'username-' + Math.random()
      password = 'password-' + Math.random()
      await register(name, surname, username, password)
      await autenticate(username, password)
  });

  it('should retrive user' ,() => {
    return retriveUser()
      .then((user) => {
          expect(user.name).toEqual(name)
          expect(user.surname).toEqual(surname)
          expect(user.username).toEqual(username)
      })
  });
  
  it('should fail when token is old', async () => {
    let invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTUzNmVlMTJlOTNkZDAwMTVmNGIyZWYiLCJpYXQiOjE1ODU5MzQ5ODYsImV4cCI6MTU4NTkzODU4Nn0.H9P-NLsOwQjRmkofBzJYv0pRvM_tI0gl_pMyTovhTOk'
    
    context.token = invalidToken
  
    try {
      await retriveUser()
    } catch (error) {
      expect(error.message).toEqual('Invalid token');
    }
  });
  
  it('should fail when token is invalid', async () => {
    context.token = ''
  
    try {
      await retriveUser()
    } catch (error) {
      expect(error.message).toEqual('Invalid token');
    }
  });
})

