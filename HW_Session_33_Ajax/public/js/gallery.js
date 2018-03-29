let galleryService = new GalleryService();

class BaseGallery {
    constructor() {
        this.btnAdd = document.querySelector("#add-photo");
        this.counter = document.querySelector("#js-count");
        this.dateDropdown = document.querySelector("#dropdown-date");
        this.nameDropdown = document.querySelector("#dropdown-name");
        this.gallery = document.querySelector(".js-gallery");

        this.imgData = null;
        this.showedImgData = [];

        this.initComponent();
    }

    initComponent (){
        fetch("http://localhost:3000/cars").then(responce => responce.json())
            .then(data => {
                this.saveData(data);
                this.getShowedImgData();
                this.checkSorting();
            })
    }

    saveData(data) {
        this.imgData = data;
    }

    /*updateItem(item) {
        fetch(`http://localhost:3000/cars/${item.id}`, options).then(responce => responce.json())
            .then(data => {
                this.initComponent();
            })
    }*/

    getShowedImgData() {
        let localShowedImgData = localStorage.getItem('showedImgData');
        if (localShowedImgData) {
            this.showedImgData = JSON.parse(localShowedImgData);
            this.imgData = this.imgData.filter(item => this.showedImgData.every(elem => elem.id !== item.id));
            this.restoreImg();
        }
    }

    setNumberOfImg() {
        this.counter.innerHTML = this.showedImgData.length;
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
    }

    sortingHandler(type, event) {
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
    }

    initListeners() {
        this.btnAdd.addEventListener("click", this.addOneImg.bind(this));
        this.nameDropdown.addEventListener("click", this.sortingHandler.bind(this, 'Name'));
        this.dateDropdown.addEventListener("click", this.sortingHandler.bind(this, 'Date'));
        this.gallery.addEventListener("click", this.imgDelete.bind(this));
    }

    removeListeners() {
        this.btnAdd.removeEventListener("click", this.addOneImg.bind(this));
        this.nameDropdown.removeEventListener("click", this.sortingHandler.bind(this, 'Name'));
        this.dateDropdown.removeEventListener("click", this.sortingHandler.bind(this, 'Date'));
        this.gallery.removeEventListener("click", this.imgDelete.bind(this));
    }
}

