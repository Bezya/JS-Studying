export default class GalleryController {   
    constructor (commonModel, galleryModel, galleryView, utils){
        this.commonModel = commonModel;
        this.model = galleryModel;
        this.view = galleryView;
        this.utils = utils;
        this.init();
    }

    bindEvents() {
        this.view.DOMElements.form.addEventListener('change', (e) => {
            let file = this.view.DOMElements.upload.files[0];
            if(file === undefined) return null;
            this.model.uploadPhoto(file)
                .then(
                    res => {
                        return this.rebuildGallery(res.result)},
                    rej => console.log(rej)
                );
            e.preventDefault();
        });

        this.view.DOMElements.photoGallery.addEventListener("click", (e) => {
            e.preventDefault();
            let id = this.view.getPhotoIdForDelete(e);
            if (id) {
                this.model.deletePhoto(id)
                    .then(
                        res => this.rebuildGallery(res.result),
                        rej => console.log(rej)
                    )
            }
        })
    }

    rebuildGallery(data) {
        if (data) return this.view.init(data);
        return this.model.getData()
            .then(
                res => this.view.initGallery(res),
                rej => console.log(rej)
            )
    }

    fillPageHeader() {
        return this.commonModel.getData()
            .then(
                res => this.view.initGalleryHeader(res),
                rej => console.log(rej)
            )
    }

    init() {
        this.fillPageHeader();
        this.rebuildGallery();
        this.bindEvents();
    }
}