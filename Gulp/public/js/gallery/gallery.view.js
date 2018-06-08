export default class GalleryView {
    constructor () {
        this.DOMElements = {
            userAvatar: document.querySelector(".header-user-avatar"),
            userName: document.querySelector(".header-user-name"),
            userStatus: document.querySelector(".header-user-status"),

            btnAdd: document.querySelector("#add-photo"),
            photoGallery: document.querySelector("#photo-gallery"),
            galleryPage: document.querySelector("#gallery-view"),
            form: document.querySelector(".gallery-img-upload"),
            upload: document.querySelector("#uploadBtn"),
        };

        this.galleryTemplate = function(item){
            return `<div style="margin-bottom: 10px; margin-right: 10px; display: inline-block; vertical-align: bottom;">
                   <div class="img" img-id="${item.id}">
                       <img data-width="640" data-height="400" data-action="zoom" style="width: 200px;"
                       src="${item.url}" style="width: px; height: 500px;">
                   </div>
                   <button class="btn btn-pill btn-link" type="button" data-toggle="tooltip" data-placement="bottom" title="Like photo">
                    <span class="h bmc like-photo"  img-id="${item.id}" style="color: #808080"></span></button>
                   <button class="btn btn-pill btn-link" type="button" data-toggle="tooltip" data-placement="bottom" title="Comment photo">
                    <span class="h bif comment-photo" img-id="${item.id}" style="color: #808080"></span></button>
                   <button class="btn btn-pill btn-link" type="button" data-toggle="tooltip" data-placement="bottom" title="Download photo">
                    <span class="h bdg download-photo" img-id="${item.id}" style="color: #808080"></span></button>
                   <button class="btn btn-pill btn-link" type="button" data-toggle="tooltip" data-placement="bottom" title="Delete photo">
                    <span class="h blh delete-photo" img-id="${item.id}"style="color: #808080"></span></button>
              </div>`
        };

        this.imgData = [];
        this.profile = null;
    }

    initGallery(data) {
        this.saveData(data);
        this.buildGallery();
        return data;
    }

    initGalleryHeader(data){
        this.saveProfileData(data);
        this.fillGalleryHeader(data);
        return data;
    }

    saveData(data) {this.imgData = data;}

    saveProfileData(data) {this.profile = data};

    getPhotoIdForDelete(e) {
        if (e.target.classList.contains('delete-photo')) {
            return e.target.getAttribute('img-id');
        }
    }

    buildGallery(){
        let result = '';
        this.imgData.forEach(item => {result += this.galleryTemplate(item);});
        this.DOMElements.photoGallery.innerHTML = result;
    }

    fillGalleryHeader(profile) {
        this.DOMElements.userAvatar.setAttribute('src', profile.profile.avatar);
        this.DOMElements.userName.innerHTML = profile.profile.name;
        this.DOMElements.userStatus.innerHTML = profile.profile.status;
    }
}