export default class Utils {
    constructor() {
        this.hide = 'hide';
        this.show = 'show';
    }

    static hideElement(element) { element.classList.add(this.hide) }; //скрывает элемент

    static showElement(element) { element.classList.remove(this.hide) }; //показывает элемент

    static showHideElement(showEl, hideEl) { //показывает и скрывает
        showEl.classList.add(this.show);
        hideEl.classList.remove(this.show);
    }

    static showHideViews(showEl, hideEl) { // показывает/скрывает (массивы элементов)
            showEl.forEach((item) => item.classList.remove(this.hide));
            hideEl.forEach((item) => item.classList.add(this.hide));
        }
        // скрывает массив элементов

    static showView(views) {
        views.forEach(element => {
            element.classList.remove("hide");
        });
    }

    static hideView(views) {
        views.forEach(element => {
            element.classList.add("hide");
        });
    }

    static initTemplate(wrapperEl, templateId) {
        let template = document.querySelector(`#${templateId}`);
        let clon = template.content.cloneNode(true);
        wrapperEl.innerHTML = '';
        wrapperEl.appendChild(clon);
    }

    static navigateTo(routeName) { window.location.hash = "#" + routeName }

    static isLoggedIn() {
        let credentials = JSON.parse(localStorage.getItem('credentials'));
        return !!credentials;
    }
}