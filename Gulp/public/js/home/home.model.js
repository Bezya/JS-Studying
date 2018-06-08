export default class HomeModel {
    constructor() {
        this.url = "http://localhost:3000/posts/";
        this.uploadUrl = "http://localhost:3000/upload";

        this.comments = [];
    }

    getData() {
        return fetch(this.url).then(responce => responce.json())
            .then(data => {
                return data;
            })
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

    getOnePost(id) {
        return fetch(this.this.url + "/" + id).then(responce => responce.json())
            .then(data => {
                return data;
            })
    }

    createPost(method, obj) {
        return fetch(this.url, this.requestMethod(method, obj))
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

    updatePost(obj ) {
        return fetch(this.url + obj.id, this.requestMethod( "PUT", obj))
            .then(response => {
                if (!response.status == 201) {
                    throw new Error(response.status);
                }return response.json();
            })
    }

    uploadPostImgs(file) {
        let photo = new FormData();
        photo.append('myFile', file);
        return fetch(this.uploadUrl, {//добавляет фото в паппку с фотками
            method: 'POST',
            body: photo
        }).then(() => {
            return file.name;
        })
    }

    deletePost(id){ //метод для удаления элемента галереи
        let requestMethod = {
            headers: { 'Content-type': 'application/json; charset=utf-8' },
            method: 'delete'
        };
        return fetch(this.url + id, requestMethod).then(response => {
            if (!response.status == 201) {
                throw new Error(response.status);
            }
            return response.json();
        })
    }

    deleteComment(id){ //метод для удаления элемента галереи
        let obj = {
            id,
            "comments": this.comments.filter(item => item.id != id)
        };

        return this.updatePost(obj);

        /*return fetch(this.url + postId, this.requestMethod("PUT", obj)).then(response => {
            if (!response.status == 201) {
                throw new Error(response.status);
            }return response.json();
        })*/
    }
}