(function() {

    class GalleryModel {
        constructor(url) {
            this.getUrl= url;
        }

        getData() {
            return fetch(this.getUrl).then(responce => responce.json()) // return чтобы мы могли вернуть данные в контролер
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

        requestBody(obj) {
            return JSON.stringify(obj);
        }


        createItem(method, obj) { //метод для создания элемента галереи
            return fetch(this.getUrl, this.requestMethod(method, obj)).then(response => {
                if (response.status == 201) {
                    return response.json();
                }
                throw new Error(response.status);
            });

            return new Promise(
                function(resolve, reject) {
                    resolve(obj);
                }
            );

        }

        updateItem(method, obj, id) { //метод для обновения элемента галереи
            return fetch(this.getUrl + id, this.requestMethod(method, obj)).then(response => {
                if (!response.status == 201) {
                    throw new Error(response.status);
                }
                return response.json();
            });

        }

        deleteItem(id) { //метод для удаления элемента галереи
            let requestMethod = {
                headers: { 'Content-type': 'application/json; charset=utf-8' },
                method: 'delete'
            };
            return fetch(this.getUrl + id, requestMethod).then(response => {
                if (!response.status == 201) {
                    throw new Error(response.status);
                }
                return response.json();
            })
        }

        setDataToLS(name, element){
            localStorage.setItem(name, element);
        }

        getDataFromLS(name, element){
           return localStorage.getItem(name, element);
        }

        removeDataFromLS(name){
            localStorage.removeItem(name);
        }

        logOut(){
            localStorage.removeItem('login');
            localStorage.removeItem('password');
        }


    }

    window.app = window.app || {};
    window.app.GalleryModel = GalleryModel;

}());