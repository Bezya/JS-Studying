export default class GalleryController {   
    constructor (galleryModel, galleryView, utils){
        this.model = galleryModel;
        this.view = galleryView;
        this.utils = utils;
        this.init();
    }
    rebuildGallery() {
        return this.model.getData()
            .then(
                res => {
                    this.view.init(res);
                },
                rej => { console.log(rej) }
            )
    }

    init() {
        this.rebuildGallery();
    }
}