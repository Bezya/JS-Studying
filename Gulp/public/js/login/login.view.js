export default class LoginView {
    constructor() {
        this.DOMElements = {
            login: document.querySelector('#inputEmail'),
            password: document.querySelector('#inputPassword'),
            alert: document.querySelector('.alert'),

            logInBtn: document.querySelector('#log-in-btn'),
            SingUpBtn: document.querySelector('#sing-up-btn'),
            logOutBtn: document.querySelector('#log-out-btn'),

            forgotPassLink: document.querySelector('#forgot-password-link'),
        }
    }
/*
    showMsg(msg) {
        if (msg) {
            this.DOMElements.alert.classList.remove("hide");
            this.DOMElements.alert.innerHTML = msg;
        }
    }

    hideMsg() { this.DOMElements.alert.classList.add("hide"); }

    //showLogout() {this.DOMElements.logOutBtn.classList.remove("hide");}

    //hideLogout() {this.DOMElements.logOutBtn.classList.add("hide");}

    getCredentials() {
        return {
            login: this.DOMElements.login.value,
            password: this.DOMElements.password.value
        }
    }*/
}