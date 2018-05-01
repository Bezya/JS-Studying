export default class GalleryModel {
    constructor () {
        this.url = "http://localhost:3000/photos/";
    }

    getData() {
        return fetch(this.url).then(responce => responce.json()) // return чтобы мы могли вернуть данные в контролер
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
        return fetch(this.getUrl, this.requestMethod(method, obj))
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
}