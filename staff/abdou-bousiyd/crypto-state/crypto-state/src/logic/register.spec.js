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

  it('should fail on none name', () => {
    expect(() =>
    register()
      ).toThrowError(Error, 'name should be defined')
  });


  it('should fail on none surname', async () => {
    expect(() =>
    register(name)
      ).toThrowError(Error, 'surname should be defined')
  });

  it('should fail on none username', async () => {
      expect(() =>
      register(name, surname)
      ).toThrowError(Error, 'username should be defined')
  });

  it('should fail on none password', async () => {
    expect(() =>
    register(name, surname, username)
    ).toThrowError(Error, 'password should be defined')
      
  });

  it('should register user', async () => {
      await register(name, surname, username, password)
      await authenticateUser(username, password)
      const { token } = context
      expect(typeof token).toBe('string')
      expect(token.length).toBeGreaterThan(0)

  });

  it('should fail when user is already exist', () => { 
    return register(name, surname, username, password)
    .catch(err => { 
    expect(err.message).toMatch('already exists') }) 
  })
  
})  
