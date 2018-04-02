let galleryService = new GalleryService();

class BaseGallery {
    constructor(editCallBack) {
        this.btnAdd = document.querySelector("#add-photo");
        this.counter = document.querySelector("#js-count");
        this.dateDropdown = document.querySelector("#dropdown-date");
        this.nameDropdown = document.querySelector("#dropdown-name");
        this.gallery = document.querySelector(".js-gallery");
        this.createUrl = document.querySelector("#createUrl");
        this.createName = document.querySelector("#createName");
        this.createDescription = document.querySelector("#createDescription");
        this.editCallBack = editCallBack;

        this.imgData = null;
        this.showedImgData = [];
        this.ready = false;
        this.url = "http://localhost:3000/cars";
    }
    isReady(){
        return this.ready;
    }

    initComponent(){
        let dataResponse = this.dataResponse();
        if(dataResponse){
            dataResponse.then(data => {
                        this.saveData(data);
                        this.buildGallery();
                        this.ready = true;
            })
        }
    }

    dataResponse(){
        return fetch(this.url).then(responce => responce.json())
    }

    saveData(data) {
        this.imgData = data;
    }

    initListeners() {
        //this.btnAdd.addEventListener("click", this.addOneImg.bind(this));
        //this.nameDropdown.addEventListener("click", this.sortingHandler.bind(this, 'Name'));
        //this.dateDropdown.addEventListener("click", this.sortingHandler.bind(this, 'Date'));
        this.gallery.addEventListener("click", this.imgEdit.bind(this));
        this.gallery.addEventListener("click", this.deleteItem.bind(this));
    }

    bodyRequest(){
        return JSON.stringify({
            url: this.createUrl.value,
            name: this.createName.value,
            description: this.createDescription.value,
            date: Date.now()
        })
    }

    requestMethod(method){
        let requestMethod = {
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            method: method,
            body: this.bodyRequest()
        };
        return requestMethod;
    }

    fetch(url, method){
        return fetch(url, method).then(response =>{
            if (response.status == 201){
                return response.json();
            }
            throw new Error(response.status);
        })
    }

    createItem(e){
        e.preventDefault();
        let requestMethod = this.requestMethod("post");
        return fetch(this.url, requestMethod).then(response =>{
            if (response.status == 201){
                return response.json();
            }
            throw new Error(response.status);
        })
            .then(()=> this.initComponent())
            .catch(e => e);
    }

    deleteItem(e){
        e.preventDefault();
        let id = e.target.getAttribute("data-id");
        let requestMethod = this.requestMethod("delete");

        return fetch(this.url + id, requestMethod).then(response => response.json())
            .then(()=> this.initComponent())
            .catch(e => e);
    }

    updateItem(e){
        e.preventDefault();
        let id = e.target.getAttribute("data-id");
        let requestMethod = this.requestMethod("put");

        return fetch(this.url + id, requestMethod).then(response =>{
            if (response.status == 201){
                return response.json();
            }
            throw new Error("Error");
        })
            .then(()=> this.initComponent())
            .catch(e => e);
    }

    fillFields(item){
        this.createUrl.value = item.url;
        this.createName.value = item.name;
        this.createDescription.value = item.description;
    }

    imgEdit(e){
        e.preventDefault();
        if(e.target.classList.contains('edit')){
            let element = e.target;
            while (!element.classList.contains('gallery-item')) {
                element = element.parentNode;
            }
            let id = element.getAttribute('data-id');
            let imgForUpdate = this.imgData.find((item) => item.id == id);
            this.fillFields(imgForUpdate);
            this.editCallBack();
        }
    }

    buildGallery() {
        let result = '';
        this.imgData.forEach(item => {
        result += galleryService.galleryTemplate(item);
        });
        this.gallery.innerHTML = result;
    }

    /*getShowedImgData() {
        let localShowedImgData = localStorage.getItem('showedImgData');
        if (localShowedImgData) {
            this.showedImgData = JSON.parse(localShowedImgData);
            this.restoreImg();
        }
    }

    setNumberOfImg() {
        this.counter.innerHTML = this.imgData.length;
    }

    checkImgDataEnd(arr) {
        if (arr.length === 0) {
            this.btnAdd.classList.add("disabled");
            $('#jsModal').modal('show');
            return true
        }
        return false;
    }

    restoreImg(sortingFunction) {
        this.gallery.innerHTML = '';
        this.showedImgData.sort(sortingFunction);
        this.showedImgData.forEach((item) => this.gallery.innerHTML += galleryService.galleryTemplate(item));
        this.setNumberOfImg();
    }

    updateLocalImgData() {
        localStorage.setItem('showedImgData', JSON.stringify(this.showedImgData));
    }

    addOneImg() {
        if (this.checkImgDataEnd(this.imgData)) return;
        this.showedImgData.push(this.imgData.shift());
        this.gallery.innerHTML += galleryService.galleryTemplate(this.showedImgData[this.showedImgData.length - 1]);
        this.setNumberOfImg();
        this.updateLocalImgData();
    }

    imgDelete(e) {
        e.preventDefault();
        if (e.target.classList.contains('btn-danger')) {
            let id = e.target.getAttribute('data-id');
            let imgForDelete = this.showedImgData.find((item) => item.id == id);
            this.showedImgData = this.showedImgData.filter(item => item.id !== imgForDelete.id);
            this.imgData.push(imgForDelete);
            galleryService.removePNode(e, this.gallery);
        }
        this.btnAdd.classList.remove("disabled");
        this.setNumberOfImg();
        this.updateLocalImgData();
    }*/

    /*sortingHandler(type, event) {
        event.preventDefault();
        event.currentTarget.querySelector("button").innerHTML = event.target.innerText;
        let sortingType = event.target.getAttribute("sorting-type");
        sortingType && this.applySortingMethod(sortingType);
        localStorage.setItem(`sortingType${type}`, sortingType);
    }

    applySortingMethod(sortingType) {
        this.gallery.innerHTML = '';
        this.restoreImg(galleryService.sortingConfig[sortingType]);
    }

    checkSorting() {
        let typeName = localStorage.getItem('sortingTypeName');
        let typeDate = localStorage.getItem('sortingTypeDate');
        if (typeName) {
            this.nameDropdown.querySelector("button").innerHTML = typeName === 'A' ?
                'Вперед: от А до Я' : 'Назад: от Я до А';
            this.applySortingMethod(typeName);
        }
        if (typeDate) {
            this.dateDropdown.querySelector("button").innerHTML = typeName === 'New' ?
                'Сначала новые' : 'Сначала старые';
            this.applySortingMethod(typeName);
        }
    }*/
}

