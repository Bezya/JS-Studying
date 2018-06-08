export default class ProfileView {
    constructor() {
        this.DOMElements = {
            profile: document.querySelector("#profile-page"),
            userAvatar: document.querySelector(".header-user-avatar"),
            userName: document.querySelector(".header-user-name"),
            userStatus: document.querySelector(".header-user-status"),

            birthday: document.querySelector("#user-birthday"),
            email: document.querySelector("#user-email"),
            education: document.querySelector("#user-education"),
            city: document.querySelector("#user-city"),
            job: document.querySelector("#user-work"),
            gender: document.querySelector("#user-gender"),
            telegram: document.querySelector("#user-telegram"),
            skype: document.querySelector("#user-skype"),
            status: document.querySelector("#user-status"),
            aboutUser: document.querySelector("#user-about"),
            btnEditProfile: document.querySelector(".btn-edit-profile"),

            //Modal for profile editing
            profileModalW: document.querySelector(".profile-edit-modal"),
            modalInputBirthday: document.querySelector("#modal-input-db"),
            modalInputGender: document.querySelector("#modal-input-gender"),
            modalInputJob: document.querySelector("#modal-input-work"),
            modalInputEducation: document.querySelector("#modal-input-education"),
            modalInputEmail: document.querySelector("#modal-input-email"),
            modalInputCity: document.querySelector("#modal-input-city"),
            modalInputTelegram: document.querySelector("#modal-input-telegram"),
            modalInputSkype: document.querySelector("#modal-input-skype"),
            modalInputInterests: document.querySelector("#modal-input-interests"),
            modalInputLanguages: document.querySelector("#modal-input-languages"),
            modalInputStatus: document.querySelector("#modal-input-status"),
            modalInputAboutUser: document.querySelector("#modal-input-about"),
            btnSaveProfile: document.querySelector("#save-profile"),
        };

        this.profile = null;
    }

    init(data){
        this.saveData(data);
        this.fillUserProfile(data);
        return data;
    }

    saveData(data){
        this.profile = data;
    }

    fillUserProfile(profile){
        this.DOMElements.userAvatar.setAttribute('src', profile.profile.avatar);
        this.DOMElements.userName.innerHTML = profile.profile.name;
        this.DOMElements.userStatus.innerHTML = profile.profile.status;
        this.DOMElements.birthday.innerHTML = profile.profile.birthday;
        this.DOMElements.email.innerHTML = profile.profile.email;
        this.DOMElements.education.innerHTML = profile.profile.education;
        this.DOMElements.job.innerHTML = profile.profile.job;
        this.DOMElements.city.innerHTML = profile.profile.city;
        this.DOMElements.gender.innerHTML = profile.profile.gender;
        this.DOMElements.telegram.innerHTML = profile.profile.telegram;
        this.DOMElements.skype.innerHTML = profile.profile.skype;
        this.DOMElements.status.innerHTML = profile.profile.status;
        this.DOMElements.aboutUser.innerHTML = profile.profile.about;
    }

    showModalForProfileEdit(e){
        if (e.target.classList.contains('btn-edit-profile')) {
            $('.profile-edit-modal').modal('show');
            return true
        }
        return false;
    }

    fillModalFields() {
        let profile = this.profile.profile;
        console.log(profile);
        this.DOMElements.modalInputBirthday.value = profile.url;
        this.DOMElements.modalInputGender.value = profile.gender;
        this.DOMElements.modalInputJob.value = profile.job;
        this.DOMElements.modalInputEducation.value = profile.education;
        this.DOMElements.modalInputEmail.value = profile.email;
        this.DOMElements.modalInputCity.value = profile.city;
        this.DOMElements.modalInputTelegram.value = profile.telegram;
        this.DOMElements.modalInputSkype.value = profile.skype;
        this.DOMElements.modalInputStatus.value = profile.status;
        this.DOMElements.modalInputAboutUser.value = profile.about;
    }

    gerModalFields(){


    }

}
