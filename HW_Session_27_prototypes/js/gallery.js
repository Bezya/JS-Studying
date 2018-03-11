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

    restoreImg: function () {
        this.showedImgData.forEach((item)=> this.gallery.innerHTML += galleryService.getGalleryItemHTML(item));
        this.setNumberOfImg();
    },

    updateLocalImgData: function () {
        localStorage.setItem('imgData', JSON.stringify(this.imgData));
        localStorage.setItem('showedImgData', JSON.stringify(this.showedImgData));
    },

    addOneImg: function(){
        if (this.checkImgDataEnd(this.imgData)) return;
        this.showedImgData.push(this.imgData.shift());
        this.gallery.innerHTML += galleryService.getGalleryItemHTML(this.showedImgData[this.showedImgData.length-1]);
        this.setNumberOfImg();
        this.updateLocalImgData();
    },

    imgDelete: function(e) {
        if (e.target.classList.contains('btn-danger')) {
            let id = e.target.getAttribute('data-id');
            let imgForDelete = this.showedImgData.find((item)=> item.id == id);
            this.showedImgData = this.showedImgData.filter(item => item.id !== imgForDelete.id);
            this.imgData.push(imgForDelete);
            galleryService.removeParentNode(e, this.gallery);
        }
        this.btnAdd.classList.remove("disabled");
        this.setNumberOfImg();
        this.updateLocalImgData();
    },

    getSortingMethod: function(value){
        switch(value){
            case "0":
                return galleryService.sortNameAsc;
            case "1":
                return galleryService.sortNameDesc;
            case "2":
                return galleryService.sortDateAsc;
            case "3":
                return galleryService.sortDateDesc;
        }
    },

    sortItems: function(method){
        this.gallery.innerHTML = "";
        let methodFunction = this.getSortingMethod(method);
        this.showedImgData = this.showedImgData.sort(methodFunction);
        this.restoreImg();
    },

    updateSortingMethod: function(e){
        e.preventDefault();
        e.currentTarget.querySelector("button").innerHTML = e.target.innerText;
        let sortingType = e.target.getAttribute("data-type");
        this.sortItems(sortingType);
        localStorage.setItem('sortingType', sortingType);
    },

    checkSorting: function(){
        let method =  localStorage.getItem('sortingType');
        if (method){
            this.sortItems(this.getSortingMethod(method));
        }
    },

    initListeners: function(){
        this.btnAdd.addEventListener("click", this.addOneImg.bind(this));
        this.nameDropdown.addEventListener("click", this.updateSortingMethod.bind(this));
        this.dateDropdown.addEventListener("click", this.updateSortingMethod.bind(this));
        this.gallery.addEventListener("click", this.imgDelete.bind(this));
    },

    initComponent: function() {
        this.prepareImgData(data);
        this.checkSorting();
        this.initListeners();
    }
};