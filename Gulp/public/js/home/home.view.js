export default class HomeView {
    constructor() {
        this.DOMElements = {
            postText: document.querySelector("#photo-gallery"),
            btnUploadImg: document.querySelector("#upload-img"),
            leftAvatar: document.querySelector("#home-left-avatar"),

        };
        this.isUpdate = null;
        this.postData = null;
        this.postLineTemplate = function(item){
            return `<li class="rv b agz" post-id="${item.postId}">
                        <img class="bos vb yb aff " src="${item.avatar}">
                        <div class="rw ">
                            <div class="bpd ">
                                <div class="bpb ">
                                    <small class="acx axc ">${item.date}</small>
                                    <h6>${item.fullName}</h6>
                                </div>
                                <p>${item.post}</p>
                                <div class="boy" data-grid="images">${this.postImgTmplt(item)}</div>
                                <ul class="bow afa">${this.postCommentTmplt(item)}</ul>
                            </div>
                        </div>
                    </li>`
        };
    }

    postImgTmplt(item) {
        return [`<div style="display: none">
                    <img data-action="zoom" data-width="640" data-height="640" src="${item.url}">
                </div>`]
    }

    putAvatar(item){
        this.DOMElements.leftAvatar.setAttribute('src', item);
    }

    postCommentTmplt(item){
        return [`<li class="rv afh ">
                    <img class="bos vb yb aff " src="${item.avatar}">
                    <div class="rw "><strong>${item.fullName} :</strong>${item.comments}</div>
                </li>`]
    }

    init(data) {
        this.saveData(data);
        this.buildPage();
        return data;
    }

    saveData(data) {
        this.postData = data;
    }

    initListeners() {

    }

    bodyRequest() {
        return {}
    }

    fillFields(item) {
        this.DOMElements.name.value = item.url;
        this.DOMElements.age.value = item.name;
        this.DOMElements.mail.value = item.description;
        this.DOMElements.password.value = item.description;
        this.DOMElements.description.value = item.description;
    }

    getItemForDelete(e) {
        if (e.target.classList.contains('btn-danger')) {
            return e.target.getAttribute('data-id');
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

    buildPage() {
        let result = '';
        this.posts.forEach(item => {
            result += this.postLineTemplate(item);
        });
        this.DOMElements.posts.innerHTML = result;
    }
}