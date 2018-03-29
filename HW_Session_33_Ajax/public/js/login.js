let service = new Service();

let loginService = new LoginService();

class LoginForm {
    constructor(user, userInfoModule, galleryModule) {
        this.userInfo = userInfoModule;
        this.gallery = galleryModule;
        this.login = user.login;
        this.password = user.password;

        this.inputLogin = document.querySelector('#inputEmail');
        this.inutPassword = document.querySelector('#inputPassword');
        this.loginForm = document.querySelector('.form-signin');
        this.alert = document.querySelector('.alert');
        this.btnSingIn = document.querySelector('#btn-sign');
        this.createAndUpdateForm = document.querySelector(".create-form");
        this.btnCreateItem = document.querySelector("#create-item");

        this.navBlock = document.querySelector('.nav-block');
        this.navGallary = document.querySelector('#nav-gallery');
        this.navAboutUser = document.querySelector('#nav-user');
        this.btnExit = document.querySelector('#btn-exit');

        this.userInfoForm = document.querySelector('.userInfo-form');
        this.galleryForm = document.querySelector('.gallery-form');
    }

    setLogAndPass() {
        localStorage.setItem('loginVal', this.login);
        localStorage.setItem('passwordVal', this.password);
    }

    initGallery() {
        this.gallery.initComponent();
        this.gallery.initListeners();
    }

    initListeners() {
        this.btnSingIn.addEventListener("click", this.singIn.bind(this));
        this.navGallary.addEventListener("click", this.showGalleryAndNav.bind(this));
        this.navAboutUser.addEventListener("click", this.showAndInitUserInfoForm.bind(this));
        this.btnExit.addEventListener("click", this.logOut.bind(this));
        this.btnCreateItem.addEventListener("click", this.showCreateAndUpdateFom.bind(this));
    }

    showGalleryAndNav() {
        service.hideElement(this.loginForm);
        service.hideElement(this.userInfoForm);
        service.showElement(this.galleryForm);
        service.showElement(this.navBlock);
    }

    showAndInitUserInfoForm() {
        service.hideElement(this.galleryForm);
        service.showElement(this.userInfoForm);
        this.userInfo.initComponent();
    }

    showCreateAndUpdateFom(){
        service.hideElement(this.userInfoForm);
        service.hideElement(this.galleryForm);
        service.showElement(this.createAndUpdateForm);
        this.createAndUpdateForm.innerHTML = galleryService.createAndUpdateTemplate();
    }

    logOut() {
        this.gallery.removeListeners();
        localStorage.removeItem('login');
        localStorage.removeItem('password');
        service.hideElement(this.galleryForm);
        service.hideElement(this.navBlock);
        service.hideElement(this.userInfoForm);
        service.showElement(this.loginForm);
    }

    alertHandler(alert) {
        let msg = loginService.getErrorMsg();
        if (msg) {
            service.showElement(alert);
            alert.innerHTML = msg;
        }
    }

    logAndPassValidation() {
        if (!loginService.validation(this.inputLogin.value, this.inutPassword.value)) {
            this.alertHandler(this.alert);
        } else {
            service.hideElement(this.alert);
            localStorage.setItem('login', this.login);
            localStorage.setItem('password', this.password);
            this.showGalleryAndNav();
            this.initGallery();
        }
    }

    singIn(e) {
        e.preventDefault();
        this.logAndPassValidation();
    }

    checkSession() {
        let log = localStorage.getItem('login');
        let pass = localStorage.getItem('password');
        let logVal = localStorage.getItem('loginVal');
        let passVal = localStorage.getItem('passwordVal');

        if (log && pass) {
            return log === logVal && pass === passVal;
        }
        return false;
    }

    checkPage() {
        if (this.checkSession()) {
            service.showElement(this.galleryForm);
            service.hideElement(this.loginForm);
            service.showElement(this.navBlock);
            this.initGallery();
        } else {
            service.showElement(this.loginForm);
        }
    }

    initComponent() {
        this.setLogAndPass();
        this.checkPage();
        this.initListeners();
    }
}