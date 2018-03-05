let loginService = (function () {

    let patternMail = /^\w+@\w+\.\w{2,4}$/i;
    let patternPass = /^[a-zA-Z0-9]+$/;
    let error = null;

    let getErrorMsg = () => error;

    let setErrorMsg = (i) =>{
        let arr = ['Заполните поля логин и пароль',
            'Логин введен неправильно! В логин должны входить латинские буквы!',
            'Пароль введен неправильно! пароль может состоять только из латинских букв или цифр!',
            'Пароль слишком короткий! Пароль должен быть не менее 6 символов!',
            'Неправильные логин или пароль'];
        error =  arr[i];
    };

    let isAnyData = (login, pass) => login && pass ? true : setErrorMsg(0);

    let isValidMailAndPass = (login, pass) => {
        return (login.match(patternMail) ? true : setErrorMsg(1)) &&
                (pass.match(patternPass) ? true : setErrorMsg(2)) &&
                (pass.length >= 6 && pass.length <= 20 ? true : setErrorMsg(3));
    };

    let compareLogAndPass = (login, pass) => localStorage.getItem('login') == login && localStorage.getItem('password') == pass ?  true : setErrorMsg(4);

    let checkValidation = (login, pass) => {
        return isAnyData(login, pass) &&
                isValidMailAndPass(login, pass) &&
                compareLogAndPass(login, pass);
    };

    let hideElement = element => element.classList.add("hide");
    let showElement = element => element.classList.remove("hide");

    function inheritance(parent, child) {//функция наследования
        let tempChild = child.prototype;
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;

        for (let key in tempChild) {
            if (tempChild.hasOwnProperty(key)) {
                child.prototype[key] = tempChild[key];
            }
        }
    }

    return {
        validation: checkValidation,
        hideElement: hideElement,
        showElement: showElement,
        errorMsg: getErrorMsg,
        inheritance: inheritance
    }
})();
