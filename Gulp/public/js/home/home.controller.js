export default class HomeController {
    constructor(homeModel, homeView, observer, utils) {
        this.model = homeModel;
        this.view = homeView;
        this.observer = observer;
        this.utils = utils;
        this.pageConfig = {
            itemsPerPage: 10,
            currentPage: 0
        };
        //this.init();
    }

    bindEvents() {}

    initListeners() {
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
        /*this.model.getUsersList().then((data) => {
            this.initListeners()
            this.view.buildUsersList(this.getNextPage());
            this.isLastPage();
        });*/
    }
}