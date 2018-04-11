'user strict';
function BaseGallery () {
    this.btnAdd = document.querySelector("#add-photo");
    this.counter = document.querySelector("#js-count");
    this.dateDropdown = document.querySelector("#dropdown-date");
    this.nameDropdown = document.querySelector("#dropdown-name");
    this.gallery = document.getElementsByClassName("js-gallery");

    this.imgData = [];
}

BaseGallery.prototype = {
    prepareImgData: function(arr){
        this.imgData = galleryService.modifiedData(arr);
    },

    setNumberOfImg: function(){
        this.counter.innerHTML = this.imgData.reduce((sum, item) => { return item.isShow === true ? sum + 1 : sum }, 0);
    },

    checkImgDataEnd: function(addImg){
        if (!addImg) {
            this.btnAdd.classList.add("disabled");
            $('#jsModal').modal('show');
        }
        return false;
    },

    addOneImg: function(){
        let nextImg = this.imgData.find((item) => item.isShow === false);
        console.log(this.imgData);
        if (this.checkImgDataEnd(nextImg)){
            return;
        }
        this.gallery[0].innerHTML += galleryService.getGalleryItemHTML(nextImg);
        nextImg.isShow = true;
        this.setNumberOfImg();
    },

    imgDelete: function(e) {
        let target = e.target;
        if (target.classList.contains('btn-danger')) {
            let arr = target.classList;

            let id = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].indexOf('js-id') === 0) {
                    id = arr[i].slice(6);
                }
            }
            let imgForDelete = this.imgData.find((item)=> item.id == id);
            imgForDelete.isShow = false;

            while (target !== this) {
                if (target.parentNode === this) {
                    this.removeChild(target);
                    break;
                } else {
                    target = target.parentNode
                }
            }
        }
        this.btnAdd.classList.remove("disabled");
        this.setNumberOfImg();
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
        this.gallery[0].innerHTML = "";
        this.imgData = this.imgData.sort(method);
        this.imgData.forEach(item => {
            if(item.isShow === true){
                this.gallery[0].innerHTML += galleryService.getGalleryItemHTML(item);
            }
        })
    },

    updateSortingMethod: function(e){
        e.preventDefault();
        e.currentTarget.querySelector("button").innerHTML = e.target.innerText;
        let sortingType = e.target.getAttribute("data-type");
        this.sortItems(this.getSortingMethod(sortingType));
        localStorage.setItem('sortingMethod', this.getSortingMethod(sortingType));
    },

    checkSorting: function(){
        let method =  localStorage.getItem('sortingMethod');
        if (method){
            this.sortItems(this.getSortingMethod(method));
        }
    },

    initListeners: function(){
        this.btnAdd.addEventListener("click", this.addOneImg.bind(this));
        this.nameDropdown.addEventListener("click", this.updateSortingMethod.bind(this));
        this.dateDropdown.addEventListener("click", this.updateSortingMethod.bind(this));
        this.gallery[0].addEventListener("click", this.imgDelete.bind(this));
    },

    init: function() {
        this.prepareImgData(data);
        this.checkSorting();
        this.initListeners();
    }
};

let baseGallery  = new BaseGallery();
baseGallery.init();




