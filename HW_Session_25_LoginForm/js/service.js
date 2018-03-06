let loginService = (function () {

    let patternMail = /^\w+@\w+\.\w{2,4}$/i;
    let patternPass = /^[a-zA-Z0-9]+$/;
    let error = null;

    let getErrorMsg = () => error;

    let setErrorMsg = (i) =>{
        let arr = ['Заполните поля логин и пароль',
            'Логин введен неправильно! Разрешены только латинские буквы, цифры, следуйте шаблону!',
            'Пароль введен неправильно! Разрешены только латинские буквы и цифры!',
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
            compareLogAndPass(login, pass)
    };

    let hideElement = element => element.classList.add("hide");
    let showElement = element => element.classList.remove("hide");

    let setBtnName = (element, name) => {
        if (element.type === 'password'){
            name.innerHTML = 'Показать пароль';
        }else if(element.type === 'text'){
            name.innerHTML = 'Скрыть пароль';
        }
    };

    let showPassword = (element) => element.type == 'password' ?  element.type = 'text' : element.type = 'password';

    return {
        validation: checkValidation,
        hideElement: hideElement,
        showElement: showElement,
        errorMsg: getErrorMsg,
        setBtnName: setBtnName,
        showPassword: showPassword
    }
})();
