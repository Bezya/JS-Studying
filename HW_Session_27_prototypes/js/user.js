function UserInfoForm(){
    this.userInfoForm = document.querySelector('.userInfo-form');
    this.galleryForm = document.querySelector('.gallery-form');
    this.userLogin = document.querySelector('#userLogin');
    this.userPassword = document.querySelector('#userPassword');
    this.btnShowPass = document.querySelector('#btn-showPass');
    this.btnGoBack = document.querySelector('#btn-goBack');
}

UserInfoForm.prototype = {
    fillInfoFields: function(){
        this.userLogin.value = localStorage.getItem('login');
        this.userPassword.value = localStorage.getItem('password');
    },

    backToGallery: function () {
        loginService.hideElement(this.userInfoForm);
        loginService.showElement(this.galleryForm);
    },

    showPassword: function ()  {
        loginService.showPassword(this.userPassword);
        loginService.setBtnName(this.userPassword, this.btnShowPass);
    },

    initListeners: function () {
        this.btnShowPass.addEventListener("click", this.showPassword.bind(this));
        this.btnGoBack.addEventListener("click", this.backToGallery.bind(this));
    },

    initComponent: function () {
        this.fillInfoFields();
        this.initListeners();
    }
};
