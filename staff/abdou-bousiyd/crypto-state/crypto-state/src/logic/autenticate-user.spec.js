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
  
  it('should fail on invalid credentials', async () => {
      try {
        await authenticateUser(username, 'incorrect password')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('username and/or password wrong')
      }
  });
  
  it('should fail on none username', async () => {
    try {
      await authenticateUser()
    } catch (e) {
      expect(e.message).toMatch('username should be defined');
    }
  });
  
  it('should fail on none password', async () => {
    try {
      await authenticateUser('lorem')
    } catch (e) {
      expect(e.message).toMatch('password should be defined');
    }
  });

})  

