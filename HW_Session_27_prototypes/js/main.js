'user strict';

let user = {
    login: 'admin@gmail.com',
    password: '123123123'
};

let userInfoModule = new UserInfoForm();

let galleryModule = new BaseGallery();

let loginForm = new LoginForm(user, userInfoModule, galleryModule);
loginForm.initComponent();

