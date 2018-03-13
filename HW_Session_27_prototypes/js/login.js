
let LoginForm = function (user, userInfoModule, galleryModule) {
    this.userInfo = userInfoModule;
    this.gallery = galleryModule;
    this.login = user.login;
    this.password = user.password;

    this.inputLogin = document.querySelector('#inputEmail');
    this.inutPassword = document.querySelector('#inputPassword');
    this.loginForm = document.querySelector('.form-signin');
    this.alert = document.querySelector('.alert');
    this.btnSingIn = document.querySelector('#btn-sign');

    this.navBlock = document.querySelector('.nav-block');
    this.navGallary = document.querySelector('#nav-gallery');
    this.navAboutUser = document.querySelector('#nav-user');
    this.btnExit = document.querySelector('#btn-exit');

    this.userInfoForm = document.querySelector('.userInfo-form');
    this.galleryForm = document.querySelector('.gallery-form');
};

LoginForm.prototype = {
    setLogAndPass: function(){
        localStorage.setItem('loginVal', this.login);
        localStorage.setItem('passwordVal', this.password);
    },

    initGallery: function () {
        this.gallery.initComponent();
    },

    initListeners: function () {
        this.btnSingIn.addEventListener("click", this.singIn.bind(this));
        this.navGallary.addEventListener("click", this.showGalleryAndNav.bind(this));
        this.navAboutUser.addEventListener("click", this.showAndInitUserInfoForm.bind(this));
        this.btnExit.addEventListener("click", this.logOut.bind(this));
    },

    showGalleryAndNav: function () {
        loginService.hideElement(this.loginForm);
        loginService.hideElement(this.userInfoForm);
        loginService.showElement(this.galleryForm);
        loginService.showElement(this.navBlock);
    },

    showAndInitUserInfoForm: function () {
        loginService.hideElement(this.galleryForm);
        loginService.showElement(this.userInfoForm);
        this.userInfo.initComponent();
    },

    logOut: function () {
        localStorage.removeItem('login');
        localStorage.removeItem('password');
        loginService.hideElement(this.galleryForm);
        loginService.hideElement(this.navBlock);
        loginService.hideElement(this.userInfoForm);
        loginService.showElement(this.loginForm);
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
            this.showGalleryAndNav();
            this.initGallery();
        }
    },

    singIn: function (e){
        e.preventDefault();
        this.logAndPassValidation();
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
            loginService.showElement(this.navBlock);
            this.initGallery();
        }else{
            loginService.showElement(this.loginForm);
        }
    },

    initComponent: function () {
        this.setLogAndPass();
        this.checkPage();
        this.initListeners();
    },
};





