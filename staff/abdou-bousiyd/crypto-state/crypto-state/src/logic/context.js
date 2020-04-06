const token = {
    set token(token) {
        sessionStorage.token = token
    },

    get token() {
        return sessionStorage.token
    },

    clear() {
        sessionStorage.clear()
    },

    logout() {
        sessionStorage.clear()
        window.location.reload();
    }
}

export default token
