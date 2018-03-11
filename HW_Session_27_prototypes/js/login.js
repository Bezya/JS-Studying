let user = {
    login: 'admin@gmail.com',
    password: '123123123'
};

let LoginForm = function (user, userInfoModule, galleryModule) {
	this.userInfo = userInfoModule;
	this.gallery = galleryModule;
    this.login = user.login;
    this.password = user.password;
	this.setLogAndPass = () =>{
		localStorage.setItem('loginVal', this.login);
		localStorage.setItem('passwordVal', this.password);
	};

    this.inputLogin = document.querySelector('#inputEmail');
    this.inutPassword = document.querySelector('#inputPassword');
    this.loginForm = document.querySelector('.form-signin');
    this.alert = document.querySelector('.alert');
    this.btnSingIn = document.querySelector('#btn-sign');

    this.navGallary = document.querySelector('#nav-gallery');
    this.navAboutUser = document.querySelector('#nav-user');
    this.navExit = document.querySelector('#nav-exit');

    this.userInfoForm = document.querySelector('.userInfo-form');
    this.galleryForm = document.querySelector('.gallery-form');
};

LoginForm.prototype = {
    showGallery: function () {
        loginService.hideElement(this.loginForm);
        loginService.hideElement(this.userInfoForm);
        loginService.showElement(this.galleryForm);
    },

    initGallery: function () {
        this.gallery.initComponent();
    },

    showUserInfoForm: function () {
        loginService.hideElement(this.galleryForm);
        loginService.showElement(this.userInfoForm);
        this.userInfo.initListeners();
    },

    btnExit: function () {
        localStorage.removeItem('login');
        localStorage.removeItem('password');
        loginService.hideElement(this.galleryForm);
        loginService.showElement(this.loginForm);
    },

    checkSession: function () {
        let log = localStorage.getItem('login');
        let pass = localStorage.getItem('password');
        let logVal = localStorage.getItem('loginVal');
        let passVal = localStorage.getItem('passwordVal');

        if (log && pass){
            return log === logVal && pass === passVal;
        }
        return false;
    },

    checkPage: function () {
        if (this.checkSession()){
            loginService.showElement(this.galleryForm);
            loginService.hideElement(this.loginForm);
            this.initGallery();
        }else{
            loginService.showElement(this.loginForm);
        }
    },

    alertHandler: function(alert){
        let msg = loginService.errorMsg();
        if (msg){
            loginService.showElement(alert);
            alert.innerHTML = msg;
        }
    },

    logAndPassValidation: function () {
        if (!loginService.validation(this.inputLogin.value, this.inutPassword.value)) {
            this.alertHandler(this.alert);
        }else{
            loginService.hideElement(this.alert);
            localStorage.setItem('login', this.login);
            localStorage.setItem('password', this.password);
            this.showGallery();
            this.initGallery();
        }
    },

    singIn: function (e){
        e.preventDefault();
        this.logAndPassValidation();
    },

    initListeners: function () {
        this.btnSingIn.addEventListener("click", this.singIn.bind(this));
        this.navAboutUser.addEventListener("click", this.showUserInfoForm.bind(this));
        this.navGallary.addEventListener("click", this.showGallery.bind(this));
        this.navExit.addEventListener("click", this.btnExit.bind(this));
    },

    initComponent: function () {
        this.setLogAndPass();
        this.checkPage();
        this.initListeners();
    },

};