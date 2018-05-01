export default class LoginModel {
    constructor() {
        this.url = "http://localhost:3000/login";
        this.emailPattern = /^\w+@\w+\.\w{2,4}$/i;
        this.passwordPattern = /^[a-zA-Z0-9]{6,30}$/;
        this.errorMsg = null;
        this.errorMsgMap = {
            "empty": 'Пожалуйста заполните поля логин и пароль',
            "loginError": 'Логин введен неверно. Только латинские буквы.',
            "passError": 'Пароль введен неверно. Только латинские буквы, цифры. Длина не менее 6 символов',
            "missMatch": 'Неправильные логин или пароль.'
        };
    }

    validate(credentials) {
        return this.isEmpty(credentials) &&
            this.isEmailAssertPattern(credentials) &&
            this.isPasswordAssertPattern(credentials);
    }

    login(credentials) {
        let options = {
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            method: 'post',
            body: JSON.stringify(credentials)
        };
        return fetch(this.url, options)
            .then(responce => responce.json())
            .then(data => {
                if (data.loginStatus) {
                    localStorage.setItem('credentials', JSON.stringify(credentials));
                } else {
                    this.setErrorMsg("missMatch");
                }
                return data;
            });
    }

    getErrorMsg() {
        return this.errorMsg;
    }
    setErrorMsg(key) {
        this.errorMsg = this.errorMsgMap[key];
        return false;
    }
    isEmpty(credentials) {
        return (credentials.login && credentials.password) || this.setErrorMsg("empty");
    }
    isEmailAssertPattern(credentials) {
        return this.emailPattern.test(credentials.login) || this.setErrorMsg("loginError")
    }
    isPasswordAssertPattern(credentials) {
        return this.passwordPattern.test(credentials.password) || this.setErrorMsg("passError")
    }

    logout() {
        localStorage.removeItem('credentials');
    }
}