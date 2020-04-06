import register from './register'

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

test('should fail on none name', async () => {
    try {
      await register()
    } catch (e) {
      expect(e.message).toMatch('name should be defined');
    }
});

test('should fail on none surname', async () => {
    try {
      await register(name)
    } catch (e) {
      expect(e.message).toBe('surname should be defined');
    }
});

test('should fail on none username', async () => {
    try {
      await register(name, surname)
    } catch (e) {
      expect(e.message).toMatch('username should be defined');
    }
});

test('should fail on none password', async () => {
    try {
      await register(name, surname, username)
    } catch (e) {
      expect(e.message).toMatch('password should be defined');
    }
});

test('should register user', async () => {
    const result = await register(name, surname, username, password)
    expect(result).toMatch('ok')

});

test('should fail when user is already exist', async () => {
  try {
    await register(name, surname, username, password)
  } catch (error) {
    expect(error.message).toMatch("already exists");
  }
});
