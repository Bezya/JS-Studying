export default class GalleryController {   
    constructor (commonModel, galleryModel, galleryView, utils){
        this.commonModel = commonModel;
        this.model = galleryModel;
        this.view = galleryView;
        this.utils = utils;
        this.init();
    }

    bindEvents() {
        this.view.DOMElements.photoGallery.addEventListener("click", (e) => {
            e.preventDefault();
            let id = this.view.getItemForDelete(e);
            if (id) {
                this.commonModel.deleteItem(id)
                    .then(
                        res => this.rebuildGallery(),
                        rej => console.log(rej)
                    )
            }
        });
    }

    rebuildGallery() {
        return this.commonModel.getData()
            .then(
                res => this.view.init(this.commonModel.photos),
                rej => console.log(rej)
            )
    }

    init() {
        this.rebuildGallery();
        this.bindEvents();
    }
}