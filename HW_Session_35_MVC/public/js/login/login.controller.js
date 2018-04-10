(function() {

    class LoginController {
        constructor(loginModel, loginView, observer) {
            this.loginModel = loginModel;
            this.loginView = loginView;
            this.observer = observer;
            this.url = "http://localhost:3000/login/"
        }

        bindEvents() {
            this.loginView.DOMElements.btnSingIn.addEventListener("click", (e) => {
                e.preventDefault();
                let data = this.loginView.getLogAndPass();
                this.loginModel.logAndPassValidation(data).then(
                    res => window.location.href ='/#main',
                    rej => this.loginView.alertHandler(rej)
                );
            });
        }

        init(){
            this.bindEvents();
        }
    }

    window.app = window.app || {};
    window.app.LoginController = LoginController;
    
})();