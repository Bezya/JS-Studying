export default class HomeView {
    constructor() {
        this.DOMElements = {};
        this.isUpdate = null;
        this.imgData = null;
    }

    /*init(data) {
        this.saveData(data);
        this.buildPage();
        return data;
    }

    saveData(data) {
        this.imgData = data;
    }

    initListeners() {

    }

    bodyRequest() {
        return {}
    }

    fillFields(item) {
        this.DOMElements.name.value = item.url;
        this.DOMElements.age.value = item.name;
        this.DOMElements.mail.value = item.description;
        this.DOMElements.password.value = item.description;
        this.DOMElements.description.value = item.description;
    }

    get itemForDelete(e) {
        if (e.target.classList.contains('btn-danger')) {
            return e.target.getAttribute('data-id');
        }
    }

    get itemForEdit(e) {
        e.preventDefault();
        if (e.target.classList.contains('edit')) {
            let element = e.target;
            while (!element.classList.contains('gallery-item')) {
                element = element.parentNode;
            }
            let id = element.getAttribute('data-id');
            let imgForUpdate = this.imgData.find((item) => item.id == id);
            this.fillFields(imgForUpdate);
            this.isUpdate = id;
            this.showCreateAndUpdateFom();
            return imgForUpdate;
        }
    }

    buildPage() {
        let result = '';
        this.imgData.forEach(item => {
            result += galService.galleryTemplate(item);
        });
        this.DOMElements.gallery.innerHTML = result;
    }*/
}