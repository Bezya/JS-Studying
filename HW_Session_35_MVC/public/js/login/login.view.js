(function() {

    class LoginView {
        constructor() {
            this.DOMElements = {
                inputLogin: document.querySelector('#inputEmail'),
                inputPassword: document.querySelector('#inputPassword'),
                loginForm: document.querySelector('.form-signin'),
                alert: document.querySelector('.alert'),
                btnSingIn: document.querySelector('#btn-sign'),

                btnExit: document.querySelector('#btn-exit'),
            }
        }

        initComponent() {
            this.checkPage();
            this.initListeners();
        }

        /*initListeners() {
            this.DOMElements.btnSingIn.addEventListener("click", this.singIn.bind(this));
            this.DOMElements.btnExit.addEventListener("click", this.logOut.bind(this));
        }*/

        alertHandler(msg) {
            const alert = this.DOMElements.alert;
            if (msg) {
                service.showElement(alert);
                alert.innerHTML = msg;
            }
        }

        hideAlert(){
            service.hideElement(this.alert);
        }

        getLogAndPass(){
            return{
                login: this.DOMElements.inputLogin.value,
                password: this.DOMElements.inputPassword.value
            }
        }

        singIn(e) {
            e.preventDefault();
            this.logAndPassValidation();
        }

        /*checkPage() {
            if (this.checkSession()) {
                this.initGallery();
            } else {
                service.showElement(this.DOMElements.loginForm);
            }
        }*/
    }

    window.app = window.app || {};
    window.app.LoginView = LoginView;

}());