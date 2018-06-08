export default class LoginView {
    constructor() {
        this.DOMElements = {
            login: document.querySelector('#inputEmail'),
            password: document.querySelector('#inputPassword'),
            alert: document.querySelector('.alert'),

            logInBtn: document.querySelector('#log-in-btn'),
            SingUpBtn: document.querySelector('#sing-up-btn'),
            logOutBtn: document.querySelector('#log-out-btn'),
            logOutAvatar: document.querySelector('.logout-avatar'),

            forgotPassLink: document.querySelector('#forgot-password-link'),
        },

        this.profile = null;
    }

    initNav(data){
        this.saveProfileData(data);
        this.putLogoutAvatar(data);
        return data
    }

    saveProfileData(data){
        this.profile = data;
    }

    putLogoutAvatar(profile){
        this.DOMElements.userAvatar.setAttribute('src', profile.profile.avatar);
    }

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
    }
}