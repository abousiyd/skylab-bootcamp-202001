import authenticateUser from './authenticate-user'
import register from './register'
import context from './context'

let name; 
let surname;
let username; 
let password;

beforeEach(() => {
  name = `name-${Math.random()}`
  surname = `surname-${Math.random()}`
  username = `username-${Math.random()}`
  password = `password-${Math.random()}`
})

test('should autenticate user and return token',() => {
  return register(name, surname, username, password)
    .then(() => {
      return authenticateUser(username, password)
          .then((status) => {
              const { token } = context
              expect(typeof token).toBe('string')
              expect(token.length).toBeGreaterThan(0)
              expect(status).toEqual(200)
          })
    })
});

test('should fail on invalid credentials', async () => {
    try {
      await authenticateUser(username, 'incorrect password')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('username and/or password wrong')
    }
});

test('should fail on none username', async () => {
  try {
    await authenticateUser()
  } catch (e) {
    expect(e.message).toMatch('username should be defined');
  }
});

test('should fail on none password', async () => {
  try {
    await authenticateUser('lorem')
  } catch (e) {
    expect(e.message).toMatch('password should be defined');
  }
});

