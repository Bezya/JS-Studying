'user strict';

const domElements = {
    alert: document.querySelector('.alert'),
    loginForm1: document.querySelector('.form-signin'),
    loginForm2: document.querySelector('.form-signin2'),
    inputEmail: document.querySelector('#inputEmail'),
    inputPassword: document.querySelector('#inputPassword'),
    checkBoxRememberMe: document.querySelector('#remember-me'),
    btnSingIn: document.querySelector('#btn-sign'),
    btnShowPass: document.querySelector('#btn-showPass'),
    btnGoBack: document.querySelector('#btn-goBack'),
};

let errorMsg = ['Заполните поля логин и пароль',
                'Логин введен неправильно! Разрешены только латинские буквы,цифры, следуйте шаблону!',
                'Введены недопустимые символы! Разрешены только латинские буквы и цифры!',
                'Пароль слишком короткий! Пароль должен быть не менее 6 символов!',
                'Неправильные логин или пароль'
];

let hidePass = 'Скрыть пароль';

let printResult = (elem, input) => elem.innerHTML = input;

function LoginForm(login, password, alert, errorMsg, remember) {
    this.domLogin = login.value;
    this.domPass = password.value;
    this.alert = alert;
    this.errorMsg = errorMsg;
    this.remember = remember.value;

    let isAnyData = () => {
        if (this.domLogin && this.domPass) {
            return true;
        } else {
            alert(this.errorMsg[0]);
        }
    };

    let isValidMail = () => {
        let checkedInputData = this.domLogin.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!!checkedInputData) {
            return true;
        } else {
            alert(this.errorMsg[1]);
        }
    };

    let isValidPass = () => {
        let pass = this.domPass;
        let checkedInputData = pass.match(/^[a-zA-Z0-9]+$/);
        let len = pass.length >= 6 && pass.length <= 20;
        if (!checkedInputData) {
            alert(this.errorMsg[2]);
            return false;
        }
        if (!len) {
            alert(this.errorMsg[3]);
            return false;
        }
        return true;
    };

    this.setLogAndPass = function () {
        if (!isAnyData()) {
            return;
        }
        if (!isValidMail()) {
            return;
        }
        if (!isValidPass()) {
            return;
        }
        if (this.remember) {
            localStorage.setItem('login', this.domLogin);
            localStorage.setItem('password', this.domPass);
        }
    };
}

function showPassword(e){
    let showedPass = service.showElement()

}

function goBack(e){

}

function alertHandler(msg) {
    let elem = domElements.alert;
        if (msg) {
            setTimeout(function () {
                elem.classList.remove("show");
                elem.classList.add("hide");
            }, 3000);
            elem.classList.remove("hide");
            printResult(elem, msg);
            elem.classList.add("show");
        }
}

function btnSingIn(e) {
    e.preventDefault();
    loginForm.setLogAndPass();
}

function initListeners (){
    domElements.btnSingIn.addEventListener("click", btnSingIn);
    domElements.btnShowPass.addEventListener("click", showPassword);
    domElements.btnGoBack.addEventListener("click", goBack);
}

let loginForm = new LoginForm(domElements.inputEmail, domElements.inputPassword, alertHandler, errorMsg, domElements.checkBoxRememberMe);
initListeners();

