export default class LoginController {
    constructor(loginModel, loginView, utils) {
        this.model = loginModel;
        this.view = loginView;
        this.utils = utils
        /*this.initListeners();*/
    }

    /*initListeners() {
        this.view.DOMElements.logInBtn.addEventListener("click", this.loginHandler.bind(this));
        this.view.DOMElements.logOutBtn.addEventListener("click", this.logoutHandler.bind(this));
    }

    loginHandler(e) {
        e.preventDefault();
        let credentials = this.view.getCredentials(); // Credentials доступ к логину поролю, расспространенное название вместо getLogAndPass
        if (this.model.validate(credentials)) {
            this.model.login(credentials).then(
                data => {
                    if (data.loginStatus) {
                        this.view.hideMsg();
                        this.utils.navigateTo("home");
                    } else {
                        this.view.showMsg(this.model.getErrorMsg());
                    }
                }
            );
        } else {
            this.view.showMsg(this.model.getErrorMsg());
        }
    }

    logoutHandler() {
        this.model.logout();
        this.utils.navigateTo("");
    }*/
}