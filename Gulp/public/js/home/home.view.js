export default class HomeView {
    constructor() {
        this.DOMElements = {
            btnLogoutAvatar: document.querySelector(".logout-avatar"),
            //Left block of page
            //About user
            avatarLeftBlock: document.querySelector("#home-avatar-left"),
            userNameLeftBlock: document.querySelector("#home-name-left"),
            statusLeftBlock: document.querySelector("#home-status-left"),
            userFriendsCounter: document.querySelector("#user-friends-counter"),

            userCountry: document.querySelector("#home-user-country"),
            userFriends: document.querySelector("#home-user-friends"),
            userJob: document.querySelector("#home-user-job"),
            userCity: document.querySelector("#home-user-city"),
            userPhotosPreview: document.querySelector("#user-photos-preview"),

            //Center block of page - posts
            posts: document.querySelector("#posts"),
            btnUploadImg: document.querySelector("#img-upload"),
            postMessage: document.querySelector("#post-message"),
            btnSavePost: document.querySelector("#save-post"),
            postImgsPreview: document.querySelector("#preview-photo"),

            //Modal for comment
            commentModalW: document.querySelector(".comment-modal"),
            inputComment: document.querySelector("#input-comment"),
            btnSaveComment: document.querySelector("#save-comment"),
            btnCancelComment: document.querySelector("#cancel-comment"),
            //btnUploadImgToComment: document.querySelector("#comment-img"),
        };

        this.isUpdate = null;
        this.postData = null;
        this.profile = null;
        this.postImgs = [];
        this.postComments = [];
        this.postComment = null;
        this.postLikeCounter = 0;
        this.friendsCounter = 0;
        this.previewImgs = [];

        const getFormattedDate = date => moment(date).format('DD/MM/YYYY, hh:mm:ss');

        this.postLineTemplate = function (item) {
            return `<li class="rv b agz   media list-group-item p-4" post-id="${item.id}">
                        <img class="bos aff yb" src="${item.avatar}">
                        <div class="rw media-body">
                            <div class="bpd media-heading">
                                <small class="acx axc">${getFormattedDate(item.date)}</small>
                                <h6 align="left">${item.name}</h6>
                                <p align="left">${item.msg}</p>
                            </div>
                            <div class="boy" data-grid="images">${this.postImgTmplt(item.images)}</div>
                            <hr align="center" size="2" color="#D3D3D3" />
                              <div class="bpd media-heading" color="#D3D3D3">
                                <button class="cg axu oh post-like" type="button" post-id="${item.id}">
                                    <span class="h bmc"></span>Like</button>
                                <button class="cg axu oh post-comment" type="button" post-id="${item.id}">
                                    <span class="h bhu"></span>Comment</button>
                                <button class="cg axu oh post-edit" type="button" post-id="${item.id}">
                                    <span class="h bif"></span>Edit</button>
                                <button class="cg axu oh post-delete" type="button" post-id="${item.id}">
                                    <span class="h bbg"></span>Delete</button>
                              </div>
                            <ul class="bow afa">${this.postCommentTmplt(item.comments)}</ul>
                        </div>
                    </li>`
        };
    }

    initPosts(data) {
        this.saveData(data);
        this.buildPage();
        return data;
    }

    initProfile(data){
        this.saveProfileData(data.profile);
        this.fillRightInfoBlock(data);
        return data;
    }

    saveData(data) {this.postData = data;}

    saveProfileData(data){this.profile = data;}

    postImgTmplt(arr) {
        let imgHtmlData = '';
        arr.forEach(item => {
            imgHtmlData += `<div style="display: inline-block; margin-bottom: 0px; margin-right: 10px; vertical-align: bottom;" class>
                                <img class="boz media-body-inline-img" data-action="zoom" data-width="640" data-height="400" src="${item.url}" style="width: 203px; height: 204px;">
                            </div>`
        });
        return imgHtmlData;
    }

    postCommentTmplt(arr){
        let postHtmlData = '';
        let sortedArr = arr.sort((a,b) => a.id < b.id ? 1 : -1);
        sortedArr.forEach(item => {
            postHtmlData += `<li class="rv afd" comment-id="${item.id}">
                                <img class="bos aff vb friends-avatar" src="${item.avatar}">
                                <div class="rw " align="left"><strong>${item.name}: </strong>${item.text}</div>
                                <button class="cg ok axu oh comment-delete" type="button"  comment-id="${item.id}">
                                    <span class="h bbg"></span>Delete</button>
                            </li>`
        });
        return postHtmlData;
    }

    photosPreviewTmpl(item){
        return `<div img-id="${item.id}" style="margin-bottom: 10px; margin-right: 10px; display: inline-block; vertical-align: bottom;">
                    <img data-width="640" data-height="640" data-action="zoom" src="${item.url}" style="width: 114px; height: 115px;">
                </div>`
    }

    createPost(profile){
        let obj = {
            name: profile.name,
            date: new Date(),
            avatar: profile.avatar,
            msg: this.DOMElements.postMessage.value,
            images: this.postImgs.map((item, id) => ({
                id,
                url:`img/${item}`
                })
            ),
            comments: []
        };
        return obj;
    }

    addPostImgs(imgName){
        this.postImgs.push(imgName);
        this.DOMElements.postImgsPreview.innerHTML += `<img style="height: 100px; width: 100px" src="img/${imgName}"/>`;
    }

    resetPostImgs(){
        this.postImgs = [];
        this.DOMElements.postImgsPreview.innerHTML = "";
        this.DOMElements.postMessage.value = "";
    }

    showModalForComment(e){
        if (e.target.classList.contains('post-comment')) {
            $('.comment-modal').modal('show');
            return true
        }
        return false;
    }

    createCommentObj(input, id) {
        let comment = {
            id: id,
            name: this.profile.name,
            avatar: this.profile.avatar,
            text: input,
        };
        return comment;
    }

    getPostId(id){
        this.postComment = this.postData.find(item => item.id == id);
    }

    getPostIdForComment(e) {
        if (e.target.classList.contains('post-comment')) {
            return e.target.getAttribute('post-id');
        }
    }

    resetPostComment(){
        this.postComment = null;
    }

    getPostIdForDelete(e) {
        if (e.target.classList.contains('post-delete')) {
            return e.target.getAttribute('post-id');
        }
    }

    getCommentIdForDelete(e) {
        if (e.target.classList.contains('comment-delete')) {
            return e.target.getAttribute('comment-id');
        }
    }

    fillRightInfoBlock(profile){
        this.DOMElements.avatarLeftBlock.setAttribute('src', profile.profile.avatar);
        this.DOMElements.userNameLeftBlock.innerHTML = profile.profile.name;
        this.DOMElements.statusLeftBlock.innerHTML = profile.profile.status;
        this.DOMElements.userCountry.innerHTML = profile.profile.country;
        this.DOMElements.userFriends.innerHTML = profile.profile.friends;
        this.DOMElements.userJob.innerHTML = profile.profile.job;
        this.DOMElements. userCity.innerHTML = profile.profile.city;
    }

    initListeners() {
        this.btnAdd.addEventListener("click", this.addOneImg.bind(this));
    }

    bodyRequest() {
        return {}
    }

    getPostForDelete(e) {
        if (e.target.classList.contains('post-delete')) {
            return e.target.getAttribute('post-id');
        }
    }

    getItemForEdit(e) {
        e.preventDefault();
        if (e.target.classList.contains('edit')) {
            let element = e.target;
            while (!element.classList.contains('gallery-item')) {
                element = element.parentNode;
            }
            let id = element.getAttribute('data-id');
            let imgForUpdate = this.imgData.find((item) => item.id == id);
            this.fillFields(imgForUpdate);
            this.isUpdate = id;
            this.showCreateAndUpdateFom();
            return postForUpdate;
        }
    }

    buildPhotoPreview() {
        let result = '';
        this.previewImgs.forEach(item => {
            result += this.photosPreviewTmpl(item);
        });
        this.DOMElements.userPhotosPreview.innerHTML = result;
    }

    addNewPost(post) {
        this.postData.push(post);
        this.buildPage();
    }

    buildPage() {
        let result = '';
        this.postData.sort( (a ,b) => a.id < b.id ? 1 : -1 ).forEach(item => {
            result += this.postLineTemplate(item);
        });
        this.DOMElements.posts.innerHTML = result;
    }
}