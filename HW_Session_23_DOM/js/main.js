'user strict';
(function() {
    const btnAdd = document.getElementById("add-photo"),
        counter = document.getElementById("js-count"),
        dateDropdown = document.querySelector("#dropdown-date"),
        nameDropdown = document.querySelector("#dropdown-name"),
        gallery = document.getElementsByClassName("js-gallery");

    let imgData = [];

    function initListeners() {
        btnAdd.addEventListener("click", () => addOneItem(imgData));
        nameDropdown.addEventListener("click", updateSortingMethod);
        gallery[0].addEventListener("click", imgDelete);
        dateDropdown.addEventListener("click", updateSortingMethod);
        //nextBtn.addEventListener("click", getNextPageHandler);
    }

    function addOneItem(arr) {
        imgData = galleryService.addShowAttribute(data);
        let nextImg = arr.find((item) => item.isShow === false);
        let html = galleryService.getGalleryItemHTML(nextImg);
        gallery[0].innerHTML += html;
        nextImg.isShow = true;
        setNumberOfImg();
    }

    function setNumberOfImg() {
        counter.innerHTML = imgData.reduce((sum, item) => { return item.isShow === true ? sum + 1 : sum }, 0);
    }

    function imgDelete(e) {
        if (e.target.classList.contains('btn-danger')) {
            let target = e.target;
            while (target !== this) {
                if (target.parentNode === this) {
                    this.removeChild(target);
                    break;
                } else {
                    target = target.parentNode
                }
            }
        }

        let arr = e.target.classList;
        let id = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].indexOf('js-id') === 0) {
                id = arr[i].slice(6);
            }
        }
    }

    /*function sortItems(method) {
        gallery.innerHTML = "";
        gallery.sort(method);
        buildGallery();
    }*/

    function updateSortingMethod(event) {
        event.preventDefault();
        event.currentTarget.querySelector("button").innerHTML = event.target.innerText;
        let sortingType = event.target.getAttribute("date-type");
        if (sortingType == "new") {
            sortItems(galleryService.sortDateAsc)
        }
        if (sortingType == "old") {
            sortItems(galleryService.sortDateDesc);
        }
    }

    /*function nonActiveBtn(count) {
        if (count === data.length) {

            return;
        }
    }*/

    function init() {
        //nonActiveBtn(imgData, count);
        initListeners();
    }
    init();

})();