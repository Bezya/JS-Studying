function LoginService() {
    let patternMail = /^\w+@\w+\.\w{2,4}$/i;
    let patternPass = /^[a-zA-Z0-9]+$/;
    let errorMsg = null;

    let errorMsgMap = {
        0: 'Заполните поля логин и пароль',
        1: 'Логин введен неправильно! В логин должны входить латинские буквы!',
        2: 'Пароль введен неправильно! пароль может состоять только из латинских букв или цифр!',
        3: 'Пароль слишком короткий! Пароль должен быть не менее 6 символов!',
        4: 'Неправильные логин или пароль'
    }

    let setErrorMsg = (key) => {
        errorMsg = errorMsgMap[key];
        return false;
    };

    this.getErrorMsg = function() { return errorMsg };

    let isAnyData = (login, pass) => login && pass ? true : setErrorMsg(0);

    let isValidLogAndPass = (login, pass) => {
        return (patternMail.test(login) ? true : setErrorMsg(1)) &&
            (patternPass.test(pass) ? true : setErrorMsg(2)) &&
            (pass.length >= 6 && pass.length <= 20 ? true : setErrorMsg(3));

    };

    let isMatchLogAndPass = (login, pass) => {
        return localStorage.getItem('loginVal') == login &&
            localStorage.getItem('passwordVal') == pass ? true : setErrorMsg(4);
    };

    this.validation = (login, pass) => {
        return isAnyData(login, pass) &&
            isValidLogAndPass(login, pass) &&
            isMatchLogAndPass(login, pass);
    };

}