export default class HomeModel {
    constructor() {
        this.url = "http://localhost:3000";
        //this.getUsersUrl = 'http://localhost:3000/usersList';
        //this.getPostsUrl = "http://localhost:3000/posts";
        //this.usersListData = [];
        this.usersPosts = [];
    }

    get usersList() {
        return fetch(this.getUsersUrl).then(responce => responce.json())
            .then(data => {
                this.usersListData = data;
                return data;
            })
    }

    getUserById(id) {
        return fetch(this.this.getUsersUrl + "/" + id).then(responce => responce.json())
            .then(data => {
                return data;
            })
    }

    saveUserData(item) {

    }

    updateUserData(counter) {

    }

    requestMethod(method, obj) {
        let requestMethod = {
            headers: { 'Content-type': 'application/json; charset=utf-8' },
            method: method,
            body: this.requestBody(obj)
        };
        return requestMethod;
    }

    requestBody(obj) { return JSON.stringify(obj) }

    get allPosts() {
        return fetch(this.getPostsUrl).then(responce => responce.json())
            .then(data => {
                this.usersPosts = data;
                return data;
            })
    }

    getOnePost(id) {
        return fetch(this.this.getPostsUrl + "/" + id).then(responce => responce.json())
            .then(data => {
                return data;
            })
    }


    createPost(method, obj) {
        return fetch(this.getPostsUrl, this.requestMethod(method, obj))
            .then(response => {
                if (!response.status == 201) {
                    throw new Error(response.status);
                }
                return response.json();
            });
        return new Promise(
            function(resolve, reject) {
                resolve(obj);
            })
    }

    updatePost(method, obj, id) {
        return fetch(this.getPostsUrl + "/" + id, this.requestMethod(method, obj))
            .then(response => {
                if (!response.status == 201) {
                    throw new Error(response.status);
                }
                return response.json();
            })
    }

    deletePost(id) { //метод для удаления элемента галереи
        let requestMethod = {
            headers: { 'Content-type': 'application/json; charset=utf-8' },
            method: 'delete'
        };
        return fetch(this.getPostsUrl + "/" + id, requestMethod).then(response => {
            if (!response.status == 201) {
                throw new Error(response.status);
            }
            return response.json();
        })
    }

    setDataToLS(name, element) { localStorage.setItem(name, element) }

    getDataFromLS(name, element) { return localStorage.getItem(name, element) }

    removeDataFromLS(name) { localStorage.removeItem(name); }
}