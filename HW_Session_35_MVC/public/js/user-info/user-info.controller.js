(function() {

    class InfoController {
        constructor(infoModel, infoView) {
            this.infoModel = infoModel;
            this.infoView = infoView;
        }

        /*bindEvents() {
            this.infoView.DOMElements.btnShowPass.addEventListener("click", () => {
                this.infoView.showPassword();
            });

            this.infoView.DOMElements.btnGoBack.addEventListener("click", () => {
                this.infoView.backToGallery();
                window.location.href = '/#main';
            });
        }*/

        fillInfoFields() {
            let login = this.infoModel.login;
            let password = this.infoModel.password;
            console.log(login);
            this.infoView.fillFields(login, password)
        }

        init() {
            this.fillInfoFields();
            this.infoView.initListeners();
            //this.bindEvents();
        }
    }

    window.app = window.app || {};
    window.app.InfoController = InfoController;

})();