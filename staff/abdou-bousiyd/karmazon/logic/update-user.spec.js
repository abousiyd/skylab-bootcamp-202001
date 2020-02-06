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



    // describe('when the token has not been edited', () => {
    //     beforeEach(done => {
    //         call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
               
    //         }, response => {
    //             if (response instanceof Error) return done(response)
    //             done()
    //         })
    //     })

    //     it('should fail when editing user not exist', done => {
    //         updateUser(name, surname, username, password, error => {
    //             expect(error).toBeDefined()
    //             expect(error.message).toBe(`user with username "${username}" already no exist`)

    //             done()
    //         })
    //     })
    // })



    it('should fail on none token', () => {
        const token = null;
        expect(() =>
        updateUser({username, oldPassword: password, password: 'new-password'}, token, () => { })
        ).toThrowError(TypeError, `token ${token} is not a string`)
    })


    

})