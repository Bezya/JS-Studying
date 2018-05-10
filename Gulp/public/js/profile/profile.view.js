export default class ProfileView {
    constructor() {
        this.DOMElements = {
            fullName: document.querySelector(".name"),
            caption: document.querySelector(".caption"),
            profile: document.querySelector("#user-profile"),
            firstName: document.querySelector("#first-name"),
            lastName: document.querySelector("#last-name"),
            birthday: document.querySelector("#user-birthday"),
            email: document.querySelector("#user-email"),
            password: document.querySelector("#user-password"),
            passwordConfirm: document.querySelector("#confirm-password"),
            phone: document.querySelector("#user-phone"),
            country: document.querySelector("#user-country"),
            city: document.querySelector("#user-city"),
            zip: document.querySelector("#user-zip"),
            address: document.querySelector("#user-address"),
            workPlace: document.querySelector("#user-work"),
            male: document.querySelector("#user-gender-male"),
            female: document.querySelector("#user-gender-female"),
            aboutUser: document.querySelector("#user-about")
        }
    }

    fillFields(profile) {
        this.DOMElements.fullName.value = profile.firstName+''+profile.lastName;
        this.DOMElements.caption.value = profile.about;
        this.DOMElements.firstName.value = profile.firstName;
        this.DOMElements.lastName.value = profile.lastName;
        this.DOMElements.birthday.value = profile.birthday;
        this.DOMElements.email.value = profile.email;
        this.DOMElements.password.value = profile.password;
        this.DOMElements.passwordConfirm.value = profile.password;
        this.DOMElements.phone.value = profile.phoneNumber;
        this.DOMElements.country.value = profile.country;
        this.DOMElements.city.value = profile.city;
        this.DOMElements.zip.value = profile.zip;

    }

    showPassword() {
        utils.showPassword(this.DOMElements.userPassword);
        utils.setBtnName(this.DOMElements.userPassword, this.DOMElements.btnShowPass);
    }

    initListeners() {
        this.DOMElements.btnSaveProfile.addEventListener("click", this.showPassword.bind(this));
        this.DOMElements.btnGoBack.addEventListener("click", this.backToGallery.bind(this));
    }
}