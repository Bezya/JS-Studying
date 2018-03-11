let loginService = (function () {

    let patternMail = /^\w+@\w+\.\w{2,4}$/i;
    let patternPass = /^[a-zA-Z0-9]+$/;
    let errorMsg = null;

    let getErrorMsg = () => errorMsg;

    let setErrorMsg = (i) =>{
        let arr = ['Заполните поля логин и пароль',
            'Логин введен неправильно! В логин должны входить латинские буквы!',
            'Пароль введен неправильно! пароль может состоять только из латинских букв или цифр!',
            'Пароль слишком короткий! Пароль должен быть не менее 6 символов!',
            'Неправильные логин или пароль'];
        errorMsg =  arr[i];
    };

    let isAnyData = (login, pass) => login && pass ? true : setErrorMsg(0);

    let isValidLogAndPass = (login, pass) => {
        return (patternMail.test(login) ? true : setErrorMsg(1)) &&
            (patternPass.test(pass) ? true : setErrorMsg(2)) &&
            (pass.length >= 6 && pass.length <= 20 ? true : setErrorMsg(3));
    };

    let isMatchLogAndPass = (login, pass) => localStorage.getItem('loginVal') == login && localStorage.getItem('passwordVal') == pass ?  true : setErrorMsg(4);

    let checkValidation = (login, pass) => {
        return isAnyData(login, pass) &&
            isValidLogAndPass(login, pass) &&
            isMatchLogAndPass(login, pass);
    };

    let hideElement = element => element.classList.add("hide");
    let showElement = element => element.classList.remove("hide");

    let setBtnName = (element, btnName) => {
        if (element.type === 'password'){
            btnName.innerHTML = 'Показать пароль';
        }else if(element.type === 'text'){
            btnName.innerHTML = 'Скрыть пароль';
        }
    };

    let showPassword = (element) => element.type == 'password' ?  element.type = 'text' : element.type = 'password';

    function inheritance(parent, child) {//функция наследования
        let tempChild = child.prototype;
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;

        for (let key in tempChild) {
            if (tempChild.hasOwnProperty(key)) {
                child.prototype[key] = tempChild[key];
            }
        }
    }

    return {
        validation: checkValidation,
        hideElement: hideElement,
        showElement: showElement,
        errorMsg: getErrorMsg,
        setBtnName: setBtnName,
        showPassword: showPassword,
        inheritance: inheritance
    }
})();

var galleryService = (function() {
    const transformUrl = str => (str.indexOf('http://') !== 0) ? `http://${str}` : `${str}`;

    const transformName = name => `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;

    const transformDescription = str => (str.length > 15) ? `${str.substring(0, 15)}...` : str;

    const getFormattedDate = date => moment(date).format('YYYY/MM/DD');

    let templateES6 = item => {
        return `<div class="col-md-4">
                    <div class="card mb-4 box-shadow">
                        <img class="card-img-top" 
                            data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
                            alt="${transformName(item.name)}" 
                            src="${transformUrl(item.url)}" data-holder-rendered="true" 
                            style="height: 225px; width: 100%; display: block;">
                        <div class="card-body">
                            <div class="text-muted">${transformName(item.name)}</div>\
                            <p class="card-text">${transformDescription(item.description)}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn btn-danger" data-id="${item.id}">Удалить</div>
                                <small class="text-muted">${getFormattedDate(item.date)}</small>
                            </div>
                        </div>
                    </div>
		        </div>
	            </div></div>`;
    };

    let sortNameAsc = (a, b) => a.name > b.name ? 1 : -1;
    let sortNameDesc = (a, b) => a.name < b.name ? 1 : -1;
    let sortDateAsc = (a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1;
    let sortDateDesc = (a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1;

    let removePNode = (e, element) => {
        let target = e.target;
        while (target !== element) {
            if (target.parentNode === element) {
                element.removeChild(target);
                break;
            } else {
                target = target.parentNode
            }
        }
    };

    return {
        getGalleryItemHTML: templateES6,
        sortNameAsc: sortNameAsc,
        sortNameDesc: sortNameDesc,
        sortDateAsc: sortDateAsc,
        sortDateDesc: sortDateDesc,
        removeParentNode: removePNode
    }
}());