export default class HomeController {
    constructor(commonModel, homeModel, homeView, observer, utils) {
        this.commonModel = commonModel;
        this.model = homeModel;
        this.view = homeView;
        this.observer = observer;
        this.utils = utils;
        this.pageConfig = {
            itemsPerPage: 10,
            currentPage: 0
        };
        this.init();
    }

    bindEvents() {
        this.view.DOMElements.btnSavePost.addEventListener("click", () =>{
            let profile = this.commonModel.profile;
            let obj = this.view.createPost(profile);
            this.model.createPost("POST", obj)
                .then(
                    res => {
                        this.view.addNewPost(res);
                        this.view.resetPostImgs()
                    },
                    rej => {console.log(rej)})
        });

        this.view.DOMElements.btnUploadImg.addEventListener("change", (e) => {
            let file = this.view.DOMElements.btnUploadImg.files[0];
            if(file === undefined) return null;
            this.model.uploadPostImgs(file).then(
                res => this.view.addPostImgs(res),
                rej => console.log(rej)
            )
        });

        this.view.DOMElements.posts.addEventListener("click", (e) => {
            e.preventDefault();
            let id = this.view.getPostIdForComment(e);
            if (id) {
                this.view.getPostId(id);
            }
        });

        this.view.DOMElements.btnSaveComment.addEventListener('click', (e) =>{
            let obj = this.view.postComment;
            let comment = this.view.DOMElements.inputComment.value;
            let id = obj.comments.reduce((id, item) => {return id > item.id ? id : item.id+1}, 0);
            obj.comments.push(this.view.createCommentObj(comment, id));
            this.model.updatePost(obj)
                .then(
                    res => this.rebuildPosts(),
                    rej => console.log(rej)
                )
        });

        this.view.DOMElements.posts.addEventListener("click", (e) => {
            e.preventDefault();
            let id = this.view.getPostIdForDelete(e);
            if (id) {
                this.model.deletePost(id)
                    .then(
                        res => this.rebuildPosts(),
                        rej => console.log(rej)
                    )
            }
        });

        this.view.DOMElements.posts.addEventListener("click", (e) => {
            e.preventDefault();
            let id = this.view.getCommentIdForDelete(e);
            let comment = this.view.postComment;
            let postId = this.view.getPostId();
            if (id) {
                this.model.deleteComment(comment, id, )
                    .then(
                        res => this.rebuildPosts(),
                        rej => console.log(rej)
                    )
            }
        });

        this.view.DOMElements.posts.addEventListener("click", (e) => {
            e.preventDefault();
            this.view.showModalForComment(e);
        });
    }

    rebuildPosts() {
        return this.model.getData()
            .then(
                res => this.view.initPosts(res),
                rej => console.log(rej)
            )
    }

    fillLeftBlock() {
        return this.commonModel.getData()
            .then(
                res => this.view.initProfile(res),
                rej => console.log(rej)
            )
    }

    init(){
        this.fillLeftBlock();
        this.rebuildPosts();
        this.bindEvents();
    }
}




/*initListeners() {
        this.view.DOMElements.search.addEventListener("keyup", this.searchHandler.bind(this));
        this.view.DOMElements.emailDropdown.addEventListener("click", this.sortingHandler.bind(this));
        this.view.DOMElements.roleDropdown.addEventListener("click", this.sortingHandler.bind(this));
        this.view.DOMElements.nextBtn.addEventListener("click", this.getNextPageHandler.bind(this));
    }

    searchHandler(event) {
        event.preventDefault();
        let value = event.target.value;
        if (event.keyCode === 13 && (value.length == 0 || value.length > 2)) {
            this.pageConfig.currentPage = 0;
            this.view.clearList();
            this.view.buildUsersList(this.getNextPage(), this.utils.sortingConfig["Find"]);
        }
    }

    sortingHandler(event) {
        event.preventDefault();
        this.view.updateButtonText(event);
        this.applySortingMethod(this.view.getSortingType(event));
    }

    getNextPageHandler(event) {
        event && event.preventDefault();
        this.view.buildUsersList(this.getNextPage());
        this.isLastPage();
    }

    applySortingMethod(sortingType) {
        if (!sortingType) { return }
        this.pageConfig.currentPage = 0;
        this.view.clearList();
        this.view.buildUsersList(this.getNextPage(), this.utils.sortingConfig[sortingType]);
    }

    getNextPage() {
        let start = this.pageConfig.itemsPerPage * this.pageConfig.currentPage;
        let end = this.pageConfig.itemsPerPage + start;
        this.pageConfig.currentPage++;
        return this.model.usersListData.slice(start, end);
    }

    isLastPage() {
        if (this.isMaxPage()) {
            this.view.hideNextPage();
            this.countStats();
        }
    }

    isMaxPage() {
        return (this.pageConfig.currentPage * this.pageConfig.itemsPerPage) >=
            this.model.usersListData.length;
    }

    init() {
        this.model.getUsersList().then((data) => {
            this.initListeners()
            this.view.buildUsersList(this.getNextPage());
            this.isLastPage();
        });*/