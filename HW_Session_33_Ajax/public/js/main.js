'user strict';

let userInfoModule = new UserInfoForm();

//let galleryModule = new BaseGallery();
//let observer = new Observer();

let loginForm = new LoginForm(userInfoModule);
loginForm.initComponent();

