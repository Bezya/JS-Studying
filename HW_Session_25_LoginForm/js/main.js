'user strict'

const domElements = {
    alert: document.querySelector('.alert'),
    loginForm: document.querySelector('.form-signin'),
    userInfoForm: document.querySelector('.form-signin2'),
    email: document.querySelector('#inputEmail'),
    password: document.querySelector('#inputPassword'),
    userEmail: document.querySelector('#inputEmail2'),
    userPassword: document.querySelector('#inputPassword2'),
    checkBoxRememberMe: document.querySelector('#remember-me'),
    btnSingIn: document.querySelector('#btn-sign'),
    btnShowPass: document.querySelector('#btn-showPass'),
    btnGoBack: document.querySelector('#btn-goBack'),
};

function LoginForm(login, password, alert, remember, loginForm, userInfoForm, userLogin, userPassword) {
    this.domLogin = login;
    this.domPass = password;
    this.alert = alert;
    this.checkBox = remember;
    this.domForm1 = loginForm;
    this.domForm2 = userInfoForm;
    this.domUserLogin = userLogin;
    this.domUserPassword = userPassword;

    let errorMsg = ['Заполните поля логин и пароль',
        'Логин введен неправильно! Разрешены только латинские буквы,цифры, следуйте шаблону!',
        'Паоль введен неправильно! Разрешены только латинские буквы и цифры!',
        'Пароль слишком короткий! Пароль должен быть не менее 6 символов!',
        'Неправильные логин или пароль'
    ];
    let regExMail = /^([\w\._]+)@\1\.([a-z]{2,6}\.?)$/i;
    let regExPass = /^[a-zA-Z0-9]+$/;

    let isAnyData = () => !this.domLogin.value && !this.domPass.value ? alert(errorMsg[0]): true;

    let isValidMail = () => {
        let checkedInputData = this.domLogin.value.match(regExMail);
        !!checkedInputData ? true : alert(errorMsg[1]);
    };

    let isValidPass = () => {
        let pass = this.domPass.value;
        let checkedInputData = pass.match(regExPass);
        let len = pass.length >= 6 && pass.length <= 20;
        if (!checkedInputData) {
            alert(errorMsg[2]);
            return false;
        } else if (!len) {
            alert(errorMsg[3]);
            return false;
        } else {
            return true;
        }

    };

    this.setLogAndPass = function() {
        if (!isAnyData()) {return;}
        if (!isValidMail()) {return;}
        if (!isValidPass()) {return;}
        if (this.checkBox.value) {
            localStorage.setItem('login', this.domLogin.value);
            localStorage.setItem('password', this.domPass.value);
            //this.domUserLogin.value = localStorage.login;
            //this.domUserPassword.value = localStorage.password;
        }
    };

    this.initComponents = function() {
    }
}

let alertHandler = (msg) =>{
    let elem = domElements.alert;
    if (msg) {
        setTimeout(() =>{
            elem.classList.remove("show");
            elem.alertclassList.add("hide");
        }, 3000);
        elem.classList.remove("hide");
        elem.innerHTML = msg;
        elem.classList.add("show");
    }
};

let loginForm = new LoginForm(domElements.email, domElements.password, alertHandler, domElements.checkBoxRememberMe);

function pressBtnSingIn(e) {
    e.preventDefault();
    loginForm.setLogAndPass();
}


let changeBtnName = () =>{
    let elem = domElements.btnShowPass;
};

function showPassword(){
    let elem = domElements.userPassword;
    elem.type == 'password' ?  elem.type = 'text' : elem.type = 'password';
}


function goBack(){
    let elem  = domElements.btnGoBack;
}

function initListeners (){
    domElements.btnSingIn.addEventListener("click", pressBtnSingIn);
    //domElements.btnSingIn.addEventListener("click", showUserInfoForm);
    domElements.btnShowPass.addEventListener("click", showPassword);
    domElements.btnGoBack.addEventListener("click", goBack);
}

initListeners();