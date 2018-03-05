'user strict';
function LoginForm () {
    this.login = document.querySelector('#inputEmail');
    this.password = document.querySelector('#inputPassword');

    this.userLogin = document.querySelector('#userLogin');
    this.userPassword = document.querySelector('#userPassword');
    this.loginForm = document.querySelector('.form-signin');
    this.userInfoForm = document.querySelector('.form-signin2');

    this.alert = document.querySelector('.alert');
    this.checkBoxRememberMe = document.querySelector('#remember-me');

    this.btnSingIn = document.querySelector('#btn-sign');
    this.btnShowPass = document.querySelector('#btn-showPass');
    this.btnGoBack = document.querySelector('#btn-goBack');
}

LoginForm.prototype = {
    setLogAndPass: function() {
    this.setLogin = 'bezverkhaya@gmail.com';
    this.setPassword  = '123123123';
    let toLStorage = () => {
        localStorage.setItem('login', this.setLogin);
        localStorage.setItem('password', this.setPassword);
        }
    },

    fillUserInfoForm: function(){
        if (this.checkBoxRememberMe.checked) {
            this.userLogin.value = localStorage.getItem('login');
            this.userPassword.value = localStorage.getItem('password');
        }
    },

    showUserInfoForm: function () {
        this.fillUserInfoForm();
        loginService.hideElement(this.loginForm);
        loginService.showElement(this.userInfoForm);
    },

    showLoginForm: function () {
        loginService.hideElement(this.userInfoForm);
        loginService.showElement(this.loginForm);
    },

    setBtnName: function () {
        if (this.userPassword.type === 'password'){
            this.btnShowPass.innerHTML = 'Показать пароль';
        }else if(this.userPassword.type === 'text'){
            this.btnShowPass.innerHTML = 'Скрыть пароль';
        }
    },

    showPassword: function () {
        this.userPassword.type == 'password' ?  this.userPassword.type = 'text' : this.userPassword.type = 'password';
        this.setBtnName();
    },

    alertHandler: function(alert){
        let msg = loginService.errorMsg();
        if (msg){
            loginService.showElement(alert);
            alert.innerHTML = msg;
        }
    },

    initComponents: function () {
        if (!loginService.validation(this.login.value, this.password.value)) {
            this.alertHandler(this.alert);
        }else{
            loginService.hideElement(this.alert);
            this.showUserInfoForm();
        }
    },

    singIn: function (e){
        e.preventDefault();
        this.initComponents();
    },

    initListeners: function () {
        this.btnSingIn.addEventListener("click", this.singIn.bind(this));
        this.btnShowPass.addEventListener("click", this.showPassword.bind(this));
        this.btnGoBack.addEventListener("click", this.showLoginForm.bind(this));
    },

};

let loginForm = new LoginForm();
loginForm.setLogAndPass();
loginForm.initListeners();

