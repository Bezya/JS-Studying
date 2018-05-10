export default class GalleryModel {
    constructor () {
        //this.url = "http://localhost:3000/usersInfo/photos/";
    }

    getData() {
        return fetch(this.url).then(responce => responce.json())
            .then(data => {
                return data;
            })
    }

    requestMethod(method) {
        let requestMethod = {
            headers: { 'Content-type': 'application/json; charset=utf-8' },
            method: method,
            body: this.requestBody()
        };
        return requestMethod;
    }

    requestBody() {return JSON.stringify({
        url: "",
    })}

    createItem(method, obj) { //метод для создания элемента галереи
        return fetch(this.url, this.requestMethod(method, obj))
            .then(response => {
                if (!response.status == 201) {
                    throw new Error(response.status);
                }return response.json();
            });
        return new Promise(
            function(resolve, reject) {
                resolve(obj);
            })
    }

    deleteItem(id) { //метод для удаления элемента галереи
        let requestMethod = {
            headers: { 'Content-type': 'application/json; charset=utf-8' },
            method: 'delete'
        };
        return fetch(this.url + id, requestMethod).then(response => {
            if (!response.status == 201) {
                throw new Error(response.status);
            }return response.json();
        })
    }
}