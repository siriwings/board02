/**
 * Created by siri on 2017-01-12.
 */
class Auth {

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    /**
     * Get a token value.
     *
     * @returns {string}
     */
// get token by name in cookie
    static getToken(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        let loginData = {};
        if (parts.length == 2)
            loginData = parts.pop().split(";").shift();
        loginData = JSON.parse(atob(loginData));
        return loginData.passport.user.token;
    }

// get username by name in cookie
    static getName(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        let loginData = {};
        if (parts.length == 2)
            loginData = parts.pop().split(";").shift();
        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));
        return loginData.passport.user.name;

    }
}

export default Auth;