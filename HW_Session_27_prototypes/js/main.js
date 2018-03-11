'user strict';

let userInfoModule = new UserInfoForm();

let galleryModule = new BaseGallery();

let loginForm = new LoginForm(user, userInfoModule, galleryModule);
loginForm.initComponent();