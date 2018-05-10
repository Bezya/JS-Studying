export default class GalleryView {
    constructor () {
        this.DOMElements = {
            btnAdd: document.querySelector("#add-photo"),
            photoGallery: document.querySelector("#photo-gallery"),
            galleryPage: document.querySelector("#gallery-view")
        };

        this.galleryTemplate = function(item){
            return `<div class="img" img-id="${item.id}" 
                            style="margin-bottom: 10px; margin-right: 10px; display: inline-block; vertical-align: bottom;">
                        <img data-width="640" data-height="400" data-action="zoom" style="width: 150px;" 
                        src="${item.url}" style="width: 253px; height: 254px;">
                        <button class="btn btn-danger" img-id="${item.id}">Удалить</button>
                   </div>`
        };

        this.imgData = null;
    }

    init(data) {
        this.saveData(data);
        this.buildGallery();
        return data;
    }

    saveData(data) {
        this.imgData = data;
    }

    getItemForDelete(e) {
        if (e.target.classList.contains('btn-danger')) {
            return e.target.getAttribute('img-id');
        }
    }

    buildGallery(){
        let result = '';
        this.imgData.forEach(item => {
            result += this.galleryTemplate(item);
        });
        this.DOMElements.photoGallery.innerHTML = result;
    }
}