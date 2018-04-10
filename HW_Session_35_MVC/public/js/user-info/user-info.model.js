(function() {

    class InfoModel {
        constructor() {
            this.login = () => localStorage.getItem('login');
            this.password = () => localStorage.getItem('password');
        }
    }

    window.app = window.app || {};
    window.app.InfoModel = InfoModel;

}());