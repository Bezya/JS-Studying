'user strict';
(function() {
    const btnAdd = document.getElementById("add-photo"),
        counter = document.getElementById("js-count"),
        dateDropdown = document.querySelector("#dropdown-date"),
        nameDropdown = document.querySelector("#dropdown-name"),
        gallery =  document.getElementsByClassName(".js-gallery");

    function initListeners (){
        btnAdd.addEventListener("click", buildGallery);
        nameDropdown.addEventListener("click", updateSortingMethod);
        dateDropdown.addEventListener("click", updateSortingMethod);
        //nextBtn.addEventListener("click", getNextPageHandler);
    }

    const getNumberOfImages = () => domElements.gallery.length;

    const getCount = () => domElements.counter.innerHTML = getNumberOfImages();

    /*function buildGallery(arr) {
        let result = arr.map(item => {
            return galleryService.getGalleryItemHTML(item);
        });
        getCount();
        gallery.innerHTML += result.join("");
    }*/
    function buildGallery(arr){

    }

    function sortItems(method) {
        gallery.innerHTML = "";
        gallery.sort(method);
        buildGallery();
    }
    const onDelete = e => {
        let block = e.target.parentElement;
        block.parentElement.removeChild(block);
        counter();
    };

    const imgDelete = () => {
        let arr = document.getElementsByClassName(".js-btn-delete");
        for(let i = 0; i < arr.length; i++){
            arr[i].addEventListener("click", onDelete);
        }
    };

    function updateSortingMethod(event) {
        event.preventDefault();
        event.currentTarget.querySelector("button").innerHTML = event.target.innerText;
        let sortingType = event.target.getAttribute("date-type");
        if (sortingType=="new") {
            sortItems(galleryService.sortDateAsc)
        }
        if (sortingType=="old") {
            sortItems(galleryService.sortDateDesc);
        }
    }
    function nonActiveBtn(count){
        if (count === data.length) {

            return;
        }
    }

    function init() {
        let count = getNumberOfImages();
        nonActiveBtn(count);
        initListeners();
        buildGallery(data[count]);
        btnAdd.addEventListener("click", buildGallery);
        imgDelete();
        getCount();
    }
    btnAdd.addEventListener("click", init);
})();