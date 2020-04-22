import authenticateUser from './authenticate-user'
import register from './register'
import context from './context'


describe('Authenticate user', () => {
  let name; 
  let surname;
  let username; 
  let password;

  beforeEach( async () => {
    name = `name-${Math.random()}`
    surname = `surname-${Math.random()}`
    username = `username-${Math.random()}`
    password = `password-${Math.random()}`
    await register(name, surname, username, password)
  })

  it('should autenticate user and return token', () => {
    return authenticateUser(username, password)
        .then(() => {
            const { token } = context
            expect(typeof token).toBe('string')
            expect(token.length).toBeGreaterThan(0)
        })
  });

  it('should fail on wrong password', () => { 
    return authenticateUser(username, 'incorrect password')
    .catch(err => { 
    expect(err.message).toBe('username and/or password wrong') }) 
  })
  
  
  it('should fail on none username', () => {
    expect(() =>
        authenticateUser()
      ).toThrowError(Error, 'username should be defined')
  });
  
  it('should fail on none password', () => {
    expect( () =>
        authenticateUser('lorem')
      ).toThrowError(Error, 'password should be defined')
  });

})  

