let galleryService = new GalleryService();

function BaseGallery () {
    this.btnAdd = document.querySelector("#add-photo");
    this.counter = document.querySelector("#js-count");
    this.dateDropdown = document.querySelector("#dropdown-date");
    this.nameDropdown = document.querySelector("#dropdown-name");
    this.gallery = document.querySelector(".js-gallery");

    this.imgData = [];
    this.showedImgData = [];
}

BaseGallery.prototype = {
    prepareImgData: function(arr){
        let localImgData = localStorage.getItem('imgData');
        let localShowedImgData = localStorage.getItem('showedImgData');
        if (localImgData){
            this.imgData = JSON.parse(localImgData);
            this.showedImgData = JSON.parse(localShowedImgData);
            this.restoreImg();
        }else {
            this.imgData = arr;
        }
    },

    setNumberOfImg: function(){
        this.counter.innerHTML = this.showedImgData.length;
    },

    checkImgDataEnd: function(arr){
        if (arr.length === 0) {
            this.btnAdd.classList.add("disabled");
            $('#jsModal').modal('show');
            return true
        }
        return false;
    },

    restoreImg: function (sortingFunction) {
        this.showedImgData.sort(sortingFunction)
        this.showedImgData.forEach((item)=> this.gallery.innerHTML += galleryService.galleryTemplate(item));
        this.setNumberOfImg();
    },

    updateLocalImgData: function () {
        localStorage.setItem('imgData', JSON.stringify(this.imgData));
        localStorage.setItem('showedImgData', JSON.stringify(this.showedImgData));
    },

    addOneImg: function(){
        if (this.checkImgDataEnd(this.imgData)) return;
        this.showedImgData.push(this.imgData.shift());
        this.gallery.innerHTML += galleryService.galleryTemplate(this.showedImgData[this.showedImgData.length-1]);
        this.setNumberOfImg();
        this.updateLocalImgData();
    },

    imgDelete: function(e) {
        e.preventDefault();
        if (e.target.classList.contains('btn-danger')) {
            let id = e.target.getAttribute('data-id');
            let imgForDelete = this.showedImgData.find((item)=> item.id == id);
            this.showedImgData = this.showedImgData.filter(item => item.id !== imgForDelete.id);
            this.imgData.push(imgForDelete);
            galleryService.removePNode(e, this.gallery);
        }
        this.btnAdd.classList.remove("disabled");
        this.setNumberOfImg();
        this.updateLocalImgData();
    },

    sortingHandler: function(type, event) {
        event.preventDefault();
        event.currentTarget.querySelector("button").innerHTML = event.target.innerText;
        let sortingType = event.target.getAttribute("sorting-type");
        sortingType && this.applySortingMethod(sortingType);
        localStorage.setItem(`sortingType${type}`, sortingType);
    },

    applySortingMethod: function(sortingType) {
        this.gallery.innerHTML = "";
        this.restoreImg(galleryService.sortingConfig[sortingType]);
    },

    checkSorting: function(){
        let typeName =  localStorage.getItem('sortingTypeName');
        let typeDate =  localStorage.getItem('sortingTypeDate');
        if(typeName) {
            this.nameDropdown.querySelector("button").innerHTML = typeName === 'A' ?
                'Вперед: от А до Я' : 'Назад: от Я до А';
            this.applySortingMethod(typeName);
        }
        if(typeDate) {
            this.dateDropdown.querySelector("button").innerHTML = typeName === 'New' ?
                'Сначала новые' : 'Сначала старые';
            this.applySortingMethod(typeName);
        }
    },

    initListeners: function(){
        this.btnAdd.addEventListener("click", this.addOneImg.bind(this));
        this.nameDropdown.addEventListener("click", this.sortingHandler.bind(this, 'Name'));
        this.dateDropdown.addEventListener("click", this.sortingHandler.bind(this, 'Date'));
        this.gallery.addEventListener("click", this.imgDelete.bind(this));
    },

    initComponent: function() {
        this.prepareImgData(data);
        this.checkSorting();
        this.initListeners();
    }
};

