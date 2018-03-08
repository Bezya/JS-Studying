let loginService = (function () {

    let patternMail = /^\w+@\w+\.\w{2,4}$/i;
    let patternPass = /^[a-zA-Z0-9]+$/;
    let errorMsg = null;

    let getErrorMsg = () => errorMsg;

    let setErrorMsg = (i) =>{
        let arr = ['Заполните поля логин и пароль',
            'Логин введен неправильно! В логин должны входить латинские буквы!',
            'Пароль введен неправильно! пароль может состоять только из латинских букв или цифр!',
            'Пароль слишком короткий! Пароль должен быть не менее 6 символов!',
            'Неправильные логин или пароль'];
        errorMsg =  arr[i];
    };

    let isAnyData = (login, pass) => login && pass ? true : setErrorMsg(0);

    let isValidLogAndPass = (login, pass) => {
        return (patternMail.test(login) ? true : setErrorMsg(1)) &&
                (patternPass.test(pass) ? true : setErrorMsg(2)) &&
                (pass.length >= 6 && pass.length <= 20 ? true : setErrorMsg(3));
    };

    let isMatchLogAndPass = (login, pass) => localStorage.getItem('login') == login && localStorage.getItem('password') == pass ?  true : setErrorMsg(4);

    let checkValidation = (login, pass) => {
        return isAnyData(login, pass) &&
                isValidLogAndPass(login, pass) &&
                isMatchLogAndPass(login, pass);
    };

    let hideElement = element => element.classList.add("hide");
    let showElement = element => element.classList.remove("hide");

    let setBtnName = (element, btnName) => {
        if (element.type === 'password'){
            btnName.innerHTML = 'Показать пароль';
        }else if(element.type === 'text'){
            btnName.innerHTML = 'Скрыть пароль';
        }
    };

    let showPassword = (element) => element.type == 'password' ?  element.type = 'text' : element.type = 'password';

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
        setBtnName: setBtnName,
        showPassword: showPassword,
        inheritance: inheritance
    }
})();
