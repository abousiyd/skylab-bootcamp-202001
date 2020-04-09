import register from './register'
import autenticate from './authenticate-user'
import updateProfile from './update-profile'
import context from './context'

describe('Update profile', () => {

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
  
  it('should update profile' ,() => {
    return updateProfile(name, surname, username, password, 'newPassword')
      .then((status) => {
          expect(status).toEqual('ok')
      })
  });
  
  
  it('should fail on none name', async () => {
      try {
        await updateProfile()
      } catch (e) {
        expect(e.message).toMatch('name should be defined');
      }
  });
  
  it('should fail on none surname', async () => {
      try {
        await updateProfile('victor')
      } catch (e) {
        expect(e.message).toBe('surname should be defined');
      }
  });
  
  it('should fail on none username', async () => {
      try {
        await updateProfile('lorem', 'ipsum')
      } catch (e) {
        expect(e.message).toMatch('username should be defined');
      }
  });
  
  it('should fail on none oldPassword', async () => {
      try {
        await updateProfile('a', 'b', 'c')
      } catch (e) {
        expect(e.message).toMatch('oldPassword should be defined');
      }
  });
  
  it('should fail on none password', async () => {
      try {
        await updateProfile('a', 'b', 'c', 'p')
      } catch (e) {
        expect(e.message).toMatch('password should be defined');
      }
  });
  
  it('should fail when invalid token', async () => {
    context.token = null
  
    try {
      await updateProfile(name, surname, username, password, 'newPassword')
    } catch (error) {
      expect(error.message).toEqual('invalid token');
    }
  });
})

