import register from './register'
import authenticateUser from './authenticate-user'
import context from './context'

describe('Register user', () => {

  let name 
  let surname 
  let username
  let password 

  beforeAll(async () => {
      name = 'name-' + Math.random()
      surname = 'surname-' + Math.random()
      username = 'username-' + Math.random()
      password = 'password-' + Math.random()
  });

  it('should fail on none name', async () => {
      try {
        await register()
      } catch (e) {
        expect(e.message).toMatch('name should be defined');
      }
  });

  it('should fail on none surname', async () => {
      try {
        await register(name)
      } catch (e) {
        expect(e.message).toBe('surname should be defined');
      }
  });

  it('should fail on none username', async () => {
      try {
        await register(name, surname)
      } catch (e) {
        expect(e.message).toMatch('username should be defined');
      }
  });

  it('should fail on none password', async () => {
      try {
        await register(name, surname, username)
      } catch (e) {
        expect(e.message).toMatch('password should be defined');
      }
  });

  it('should register user', async () => {
      await register(name, surname, username, password)
      await authenticateUser(username, password)
      const { token } = context
      expect(typeof token).toBe('string')
      expect(token.length).toBeGreaterThan(0)

  });

  it('should fail when user is already exist', async () => {
    try {
      await register(name, surname, username, password)
    } catch (error) {
      expect(error.message).toMatch("already exists");
    }
  });

})  
