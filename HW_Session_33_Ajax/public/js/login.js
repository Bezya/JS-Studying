let service = new Service();

let loginService = new LoginService();

class LoginForm {
    constructor(userInfoModule) {
        this.userInfo = userInfoModule;
        this.gallery = new BaseGallery(this.editCallBack.bind(this));
        //this.observer = observer;

        this.inputLogin = document.querySelector('#inputEmail');
        this.inutPassword = document.querySelector('#inputPassword');
        this.loginForm = document.querySelector('.form-signin');
        this.alert = document.querySelector('.alert');
        this.btnSingIn = document.querySelector('#btn-sign');
        this.createAndUpdateForm = document.querySelector(".create-form");
        this.btnCreateAndUpdate = document.querySelector("#btn-create");
        this.btnCreateItem = document.querySelector("#create-item");

        this.navBlock = document.querySelector('.nav-block');
        this.navGallary = document.querySelector('#nav-gallery');
        this.navAboutUser = document.querySelector('#nav-user');
        this.btnExit = document.querySelector('#btn-exit');

        this.userInfoForm = document.querySelector('.userInfo-form');
        this.galleryForm = document.querySelector('.gallery-form');
    }

    initComponent() {
        this.checkPage();
        this.initListeners();
    }

    initListeners() {
        this.btnSingIn.addEventListener("click", this.singIn.bind(this));
        this.navGallary.addEventListener("click", this.showGalleryAndNav.bind(this));
        this.navAboutUser.addEventListener("click", this.showAndInitUserInfoForm.bind(this));
        this.btnExit.addEventListener("click", this.logOut.bind(this));
        this.btnCreateItem.addEventListener("click", this.showCreateAndUpdateFom.bind(this));
        //this.btnCreateAndUpdate.addEventListener("click", this.createGalleryItem.bind(this));
        this.btnCreateAndUpdate.addEventListener("click", this.createOrUpdateGalleryItem.bind(this));
    }

    initGallery(data) {
        if (!this.gallery.isReady()) {
            this.gallery.initComponent(data);
            this.gallery.initListeners();
        }
    }
    editCallBack() {
        return this.showCreateAndUpdateFom();
    }

    createOrUpdateGalleryItem(e) {
        if (editCallBack()) {
            updateGalleryItem(e);
        }
        createGalleryItem(e);
    }

    createGalleryItem(e) {
        this.gallery.createItem(e).then(() => {
            this.showGalleryAndNav();
        })
    }

    updateGalleryItem(e) {
        this.gallery.updateItem(e).then(() => {
            this.showGalleryAndNav();
        })
    }

    showGalleryAndNav() {
        service.hideElement(this.loginForm);
        service.hideElement(this.userInfoForm);
        service.hideElement(this.createAndUpdateForm);
        service.showElement(this.galleryForm);
        service.showElement(this.navBlock);
    }

    showAndInitUserInfoForm() {
        service.hideElement(this.galleryForm);
        service.showElement(this.userInfoForm);
        this.userInfo.initComponent();
    }

    showCreateAndUpdateFom() {
        service.hideElement(this.userInfoForm);
        service.hideElement(this.galleryForm);
        service.showElement(this.createAndUpdateForm);
    }

    logOut() {
        localStorage.removeItem('login');
        localStorage.removeItem('password');
        service.hideElement(this.galleryForm);
        service.hideElement(this.navBlock);
        service.hideElement(this.userInfoForm);
        service.hideElement(this.createAndUpdateForm);
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
        let val = loginService.validation(this.inputLogin.value, this.inutPassword.value);
        if (val) {
            val.then(res => {
                if (res) {
                    service.hideElement(this.alert);
                    localStorage.setItem('login', this.inputLogin.value);
                    localStorage.setItem('password', this.inutPassword.value);
                    this.showGalleryAndNav();
                    this.initGallery();
                } else {
                    this.alertHandler(this.alert)
                }
            })
        } else {
            this.alertHandler(this.alert)
        }
    }

    singIn(e) {
        e.preventDefault();
        this.logAndPassValidation();
    }

    checkSession() {
        let log = localStorage.getItem('login');
        let pass = localStorage.getItem('password');
        return !!log && !!pass
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
}
