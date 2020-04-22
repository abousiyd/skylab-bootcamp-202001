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
  
  

  it('should fail on none name', () => {
    expect(() =>
    updateProfile()
      ).toThrowError(Error, 'name should be defined')
  });
  
  it('should fail on surnone name', () => {
    expect(() =>
    updateProfile('victor')
      ).toThrowError(Error, 'surname should be defined')
  });

  it('should fail on surnone username', () => {
    expect(() =>
    updateProfile('lorem', 'ipsum')
      ).toThrowError(Error, 'username should be defined')
  });

  it('should fail on none oldPassword', () => {
    expect(() =>
    updateProfile('a', 'b', 'c')
      ).toThrowError(Error, 'oldPassword should be defined')
  });
  
  it('should fail on none password', () => {
    expect(() =>
    updateProfile('a', 'b', 'c', 'p')
      ).toThrowError(Error, 'password should be defined')
  });
  
  it('should fail when invalid token', () => { 
    context.token = null
    return updateProfile(name, surname, username, password, 'newPassword')
    .catch(err => { 
    expect(err.message).toMatch('invalid token') }) 
  })
})

