(function() {
    let service = new Service();
    let userService = new UserService();

    class UserInfoView {
        constructor() {
            this.DOMElements = {
                userInfoForm: document.querySelector('.userInfo-form'),
                galleryForm: document.querySelector('.gallery-form'),
                userLogin: document.querySelector('#userLogin'),
                userPassword: document.querySelector('#userPassword'),
                btnShowPass: document.querySelector('#btn-showPass'),
                btnGoBack: document.querySelector('#btn-goBack')
            }
        }

        fillFields(login, password) {
            this.DOMElements.userLogin.value = login;
            this.DOMElements.userPassword.value = password;
        }

        backToGallery() {
            service.hideElement(this.DOMElements.userInfoForm);
            service.showElement(this.DOMElements.galleryForm);
        }

        showPassword() {
            userService.showPassword(this.DOMElements.userPassword);
            userService.setBtnName(this.DOMElements.userPassword, this.DOMElements.btnShowPass);
        }

        initListeners() {
            this.DOMElements.btnShowPass.addEventListener("click", this.showPassword.bind(this));
            this.DOMElements.btnGoBack.addEventListener("click", this.backToGallery.bind(this));
        }
    }

    window.app = window.app || {};
    window.app.UserInfoView = UserInfoView;

}());