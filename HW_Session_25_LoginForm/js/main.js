'user strict';
(function(){
const login = document.querySelector('#inputEmail'),
    password = document.querySelector('#inputPassword'),
    userLogin = document.querySelector('#userLogin'),
    userPassword = document.querySelector('#userPassword'),
    loginForm = document.querySelector('.form-signin'),
    userInfoForm = document.querySelector('.form-signin2'),
    alert = document.querySelector('.alert'),
    checkBoxRememberMe = document.querySelector('#remember-me'),
    btnSingIn = document.querySelector('#btn-sign'),
    btnShowPass = document.querySelector('#btn-showPass'),
    btnGoBack = document.querySelector('#btn-goBack');

    let setLogAndPass = {
            login: 'bezverkhaya@gmail.com',
            password: '123123123',
            toLStorage: function(){
                localStorage.setItem('login', this.login);
                localStorage.setItem('password', this.password);
            }
    };

    let fillUserInfoForm = () => {
        console.log(checkBoxRememberMe.checked);
        if (checkBoxRememberMe.checked) {
            userLogin.value = localStorage.getItem('login');
            userPassword.value = localStorage.getItem('password');
        }
    };

    let showUserInfoForm = () => {
        fillUserInfoForm();
        loginService.hideElement(loginForm);
        loginService.showElement(userInfoForm);

    };

    let showLoginForm = () => {
        loginService.hideElement(userInfoForm);
        loginService.showElement(loginForm)
    };

    let showPassword = () => {
        loginService.showPassword(userPassword);
        loginService.setBtnName(userPassword, btnShowPass);
    };

    let alertHandler = (alert) => {
        let msg = loginService.errorMsg();
        if (msg){
            loginService.showElement(alert);
            alert.innerHTML = msg;
        }
    };

    let initComponents = () =>{
        if (!loginService.validation(login.value, password.value)) {
            alertHandler(alert);
        }else{
            loginService.hideElement(alert);
            showUserInfoForm();
        }
    };

    let singIn = e => {
        e.preventDefault();
        initComponents();
    };

    let initListeners = () => {
        btnSingIn.addEventListener("click", singIn);
        btnShowPass.addEventListener("click", showPassword);
        btnGoBack.addEventListener("click", showLoginForm);
    };

    setLogAndPass.toLStorage();
    initListeners();

}());