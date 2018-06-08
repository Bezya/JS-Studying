export default class ProfileController {
    constructor(commonModel, profileModel, profileView, utils) {
        this.commonModel = commonModel;
        this.model = profileModel;
        this.view = profileView;
        this.utils = utils;
        this.init();
    }

    bindEvents() {
        this.view.DOMElements.btnEditProfile.addEventListener("click", (e) => {
            e.preventDefault();
            this.view.showModalForProfileEdit(e);
            this.view.fillModalFields();
        });
    }

    fillInfoFields() {
        return this.commonModel.getData()
            .then(
                res => this.view.init(res),
                rej => console.log(rej)
            )
    }

    init() {
        this.fillInfoFields();
        this.bindEvents();
    }
}