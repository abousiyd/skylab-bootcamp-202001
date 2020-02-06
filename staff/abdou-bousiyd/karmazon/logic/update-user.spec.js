describe('updateUser', () => {
    let name, surname, username, password

        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()

    it('should succeed on edit user', done => {
        const user = {name, surname, username, password};
        registerUser(user, () => {
            authenticateUser(user, (token) => {

                updateUser({username, oldPassword: password, password: 'new-password'}, token, response => {
                    expect(response.status).toBe(204)
                    done()
                })
            })
        })
    })

    it('should fail on none token', () => {
        const token = null;
        expect(() =>
        updateUser({username, oldPassword: password, password: 'new-password'}, token, () => { })
        ).toThrowError(TypeError, `token ${token} is not a string`)
    })

})