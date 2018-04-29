import utils from './utils.js';
import LoginController from './login/login.controller.js';
import LoginModel from './login/login.model.js';
import LoginView from './login/login.view.js';

import HomeController from './home/home.controller.js';
import HomeModel from './home/home.model.js';
import HomeView from './home/home.view.js';
import Observer from './home/observer.js';

import GalleryController from "./gallery/gallery.controller.js";
import GalleryModel from "./gallery/gallery.model.js";
import GalleryView from "./gallery/gallery.view.js";

import ProfileController from './profile/profile.controller.js';
import ProfileModel from './profile/profile.model.js';
import ProfileView from './profile/profile.view.js';

let activatedRoutes = {};

const wrapper = document.querySelector("#wrapper");

let routeConfig = {
    "": () => {
        utils.initTemplate(wrapper, "login-view");
        let model = new LoginModel;
        let view = new LoginView;
        new LoginController(model, view, utils);

    },
    "home": () => {
        utils.initTemplate(wrapper, "home-view");
        let observer = new Observer;
        let model = new HomeModel;
        let view = new HomeView;
        new HomeController(model, view, observer, new utils)
    },
    "gallery":{
        show:() => {
            utils.initTemplate(wrapper, "gallery-view");
            let model = new GalleryModel;
            let view = new GalleryView;
            new GalleryController(model, view, new utils)
        }
    },
    "profile": {
        show: () => {
        utils.initTemplate(wrapper, "profile-view");
            let model = new ProfileModel;
            let view = new ProfileView;
            new ProfileController(model, view, new utils)
        }
    }
};

function activateRoute(routeName){
    let route = routeConfig[routeName];
    route && route();
}

export function updateRoute() {
    let routeName = document.location.hash.replace(/^#/, '');
    if(routeName && !utils.isLoggedIn()) {
        utils.navigateTo("");
    } else {
        activateRoute(routeName);
    }
}