'user strict';
(function() {
    const btnAdd = document.querySelector("#add-photo"),
        counter = document.querySelector("#js-count"),
        dateDropdown = document.querySelector("#dropdown-date"),
        nameDropdown = document.querySelector("#dropdown-name"),
        gallery = document.getElementsByClassName("js-gallery");

    let imgData = [];

    let prepareImgData = arr => imgData = galleryService.modifiedData(arr);

    let setNumberOfImg = () => counter.innerHTML = imgData.reduce((sum, item) => { return item.isShow === true ? sum + 1 : sum }, 0);

    let checkImgDataEnd = (addImg) => {
        if (!addImg) {
            btnAdd.classList.add("disabled");
            $('#jsModal').modal('show');
        }
        return false;
    };

    let addOneImg = () => {
        let nextImg = imgData.find((item) => item.isShow === false);
        if (checkImgDataEnd(nextImg)){
            return;
        }
        gallery[0].innerHTML += galleryService.getGalleryItemHTML(nextImg);
        nextImg.isShow = true;
        setNumberOfImg();
    };

    function imgDelete(e) {
        let target = e.target;
        if (target.classList.contains('btn-danger')) {
            let arr = target.classList;

            let id = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].indexOf('js-id') === 0) {
                    id = arr[i].slice(6);
                }
            }
            let imgForDelete = imgData.find((item)=> item.id == id);
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
        btnAdd.classList.remove("disabled");
        setNumberOfImg();
    }

    let getSortingMethod = value => {
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
    };

    let sortItems = method => {
        gallery[0].innerHTML = "";
        imgData = imgData.sort(method);
        imgData.forEach(item => {
            if(item.isShow === true){
                gallery[0].innerHTML += galleryService.getGalleryItemHTML(item);
            }
        })
    };

    let updateSortingMethod = e => {
        e.preventDefault();
        e.currentTarget.querySelector("button").innerHTML = e.target.innerText;
        let sortingType = e.target.getAttribute("data-type");
        sortItems(getSortingMethod(sortingType));
        localStorage.setItem('sortingMethod', getSortingMethod(sortingType));
    };

    let checkSorting = () => {
        let method =  localStorage.getItem('sortingMethod');
        if (method){
            sortItems(getSortingMethod(method));
        }
    };

    function initListeners() {
        btnAdd.addEventListener("click", addOneImg);
        nameDropdown.addEventListener("click", updateSortingMethod);
        dateDropdown.addEventListener("click", updateSortingMethod);
        gallery[0].addEventListener("click", imgDelete);
    }

    function init() {
        prepareImgData(data);
        checkSorting();
        initListeners();
    }

    init();
})();
