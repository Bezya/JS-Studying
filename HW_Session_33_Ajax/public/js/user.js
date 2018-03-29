let userService = new UserService();

class UserInfoForm {
    constructor() {
        this.userInfoForm = document.querySelector('.userInfo-form');
        this.galleryForm = document.querySelector('.gallery-form');
        this.userLogin = document.querySelector('#userLogin');
        this.userPassword = document.querySelector('#userPassword');
        this.btnShowPass = document.querySelector('#btn-showPass');
        this.btnGoBack = document.querySelector('#btn-goBack');
    }

    fillInfoFields() {
        this.userLogin.value = localStorage.getItem('login');
        this.userPassword.value = localStorage.getItem('password');
    }

    backToGallery() {
        service.hideElement(this.userInfoForm);
        service.showElement(this.galleryForm);
    }

    showPassword() {
        userService.showPassword(this.userPassword);
        userService.setBtnName(this.userPassword, this.btnShowPass);
    }

    initListeners() {
        this.btnShowPass.addEventListener("click", this.showPassword.bind(this));
        this.btnGoBack.addEventListener("click", this.backToGallery.bind(this));
    }

    initComponent() {
        this.fillInfoFields();
        this.initListeners();
    }
}