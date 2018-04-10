(function() {

    class InfoController {
        constructor(infoModel, infoView, observer) {
            this.infoModel = infoModel;
            this.infoView = infoView;
            this.observer = observer;
        }

        /*bindEvents() {
            this.infoView.DOMElements.btnShowPass.addEventListener("click", ()=> {
                this.infoView.showPassword();
            });

            this.infoView.DOMElements.btnGoBack.addEventListener("click", ()=> {
                this.infoView.backToGallery();
            });
        }*/

        fillInfoFields(){
            let login = this.infoModel.login;
            let password = this.infoModel.password;
            console.log(login);
            this.infoView.fillFields(login, password)
        }

        init(){
            this.fillInfoFields();
            this.infoView.initListeners();
        }
    }

    window.app = window.app || {};
    window.app.InfoController = InfoController;

})();