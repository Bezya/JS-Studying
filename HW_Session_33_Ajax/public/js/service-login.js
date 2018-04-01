function LoginService() {
    let patternMail = /^\w+@\w+\.\w{2,4}$/i;
    let patternPass = /^[a-zA-Z0-9]+$/;
    let errorMsg = null;

    const URL = 'http://localhost:3000';

    let errorMsgMap = {
        0: 'Заполните поля логин и пароль',
        1: 'Логин введен неправильно! В логин должны входить латинские буквы!',
        2: 'Пароль введен неправильно! пароль может состоять только из латинских букв или цифр!',
        3: 'Пароль слишком короткий! Пароль должен быть не менее 6 символов!',
        4: 'Неправильные логин или пароль'
    };

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

    let isMatchLogAndPass = (login, password) => {
        let options = {
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            method: 'post',
            body: JSON.stringify({login, password})

        };
        return fetch(URL + '/login', options)
            .then(responce => {
                if(responce.status == 200){
                    return responce.json()
                }throw new Error(responce.status)
            })
            .then(data => data.status)
            .catch(() => setErrorMsg(4));
    };

    this.validation = (login, pass) => {
        if(isAnyData(login, pass) && isValidLogAndPass(login, pass)) {
            return isMatchLogAndPass(login, pass);
        }
    };
}