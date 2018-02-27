'user strict'
const domElements = {
    alert: document.querySelector('.alert'),
    loginForm: document.querySelector('.form-signin'),
    userInfoForm: document.querySelector('.form-signin2'),
    email: document.querySelector('#inputEmail'),
    password: document.querySelector('#inputPassword'),
    userEmail: document.querySelector('#inputEmail2'),
    userPassword: document.querySelector('#inputPassword2'),
    checkBoxRememberMe: document.querySelector('#remember-me'),
    btnSingIn: document.querySelector('#btn-sign'),
    btnShowPass: document.querySelector('#btn-showPass'),
    btnGoBack: document.querySelector('#btn-goBack'),
};

function LoginForm(login, password, alert, remember, loginForm, userInfoForm, userLogin, userPassword) {
    this.domLogin = login;
    this.domPass = password;
    this.alert = alert;
    this.checkBox = remember;
    this.domForm1 = loginForm;
    this.domForm2 = userInfoForm;
    this.domUserLogin = userLogin;
    this.domUserPassword = userPassword;

    let errorMsg = ['Заполните поля логин и пароль',
        'Логин введен неправильно! Разрешены только латинские буквы,цифры, следуйте шаблону!',
        'Паоль введен неправильно! Разрешены только латинские буквы и цифры!',
        'Пароль слишком короткий! Пароль должен быть не менее 6 символов!',
        'Неправильные логин или пароль'
    ];

    let isAnyData = () => this.domLogin.value && this.domPass.value ? true : alert(errorMsg[0]);

    let isValidMail = () => {
        let checkedInputData = this.domLogin.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        !!checkedInputData ? true : alert(errorMsg[1]);
    };

    let isValidPass = () => {
        let pass = this.domPass.value;
        let checkedInputData = pass.match(/^[a-zA-Z0-9]+$/);
        let len = pass.length >= 6 && pass.length <= 20;
        if (!checkedInputData) {
            alert(errorMsg[2]);
            return false;
        } else if (!len) {
            alert(errorMsg[3]);
            return false;
        } else {
            return true;
        }

    };

    let alertHandler = () =>{
        if (errorMsg) {
            setTimeout(() =>{
                this.alert.classList.remove("show");
                this.alertclassList.add("hide");
            }, 3000);
            this.alert.classList.remove("hide");
            this.alert.innerHTML = errorMsg;
            this.alert.classList.add("show");
        }
    };

    this.setLogAndPass = function() {
        if (!isAnyData()) {return;}
        if (!isValidMail()) {return;}
        if (!isValidPass()) {return;}
        if (this.checkBox.value) {
            localStorage.setItem('login', this.domLogin.value);
            localStorage.setItem('password', this.domPass.value);
            this.domUserLogin.value = localStorage.login;
            this.domUserPassword.value = localStorage.password;
        }
    };

    this.initComponents = function() {
    }
}

let loginForm = new LoginForm(domElements.email, domElements.password, alertHandler, domElements.checkBoxRememberMe);

let changeBtnName = () =>{
    let elem = domElements.btnShowPass;
};

function showPassword(){
    let elem = domElements.userPassword;
    elem.type == 'password' ?  elem.type = 'text' : elem.type = 'password';
}

let showUserInfoForm = () => {
    userLoginForm.classList.toggle('display-hide');
    userInfoForm.classList.toggle('display-hide');
};

function goBack(){
    let elem  = domElements.btnGoBack;
}

function initListeners (){
    domElements.btnSingIn.addEventListener("click", loginForm.setLogAndPass);
    domElements.btnSingIn.addEventListener("click", showUserInfoForm);
    domElements.btnShowPass.addEventListener("click", showPassword);
    domElements.btnGoBack.addEventListener("click", goBack);
}

initListeners();