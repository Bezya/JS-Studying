export default class GalleryModel {
    constructor () {
        this.url = "http://localhost:3000/usersPhotos/";
        this.uploadUrl = "http://localhost:3000/upload";

        this.photos = [];
    }

    getData() {
        let userId = this.getIdFromLS();
        if(userId === undefined) return null;
        return fetch(this.url).then(responce => responce.json())
            .then(data => {
                let user = data.find(item => item.id == userId);
                this.photos = user ? user.photos : [];
                return this.photos;
            })
    }

    getIdFromLS(){
        return localStorage.getItem("userId");
    }

    requestMethod(method, obj) {
        let requestMethod = {
            headers: { 'Content-type': 'application/json; charset=utf-8' },
            method: method,
            body: this.requestBody(obj)
        };
        return requestMethod;
    }

    requestBody(obj) { return JSON.stringify(obj) };

    uploadPhoto(file) {
        let photo = new FormData();
        photo.append('myFile', file);
        return fetch(this.uploadUrl,{//добавляет фото в паппку с фотками
            method: 'POST',
            body: photo
        }).then(() => {return this.setAndGetPhotoDBJson(file);})
    }

    setAndGetPhotoDBJson(file) { //метод для создания элемента галереи
        let fileName = file.name;
        //let id = this.photos.reduce()
        let id = this.photos.reduce((max, item) => { return max > item.id ? max : item.id+1 }, 0);
        this.photos.unshift({ //добавляет фото в db.json
            id,
            url: `img/${fileName}`
        });

        let obj = {
            "photos": this.photos
        };
        return fetch(this.url + this.getIdFromLS(), this.requestMethod("PUT", obj)//добавляет фото в галерею в приложении(видимый результат)
        ).then(response => {
            if (!response.status == 201) {
                throw new Error(response.status);
            }return response.json();
        })
    }

    deletePhoto(id) { //метод для удаления элемента галереи
        let obj = {
            "photos": this.photos.filter(item => item.id != id)
        };

        return fetch(this.url + this.getIdFromLS(), this.requestMethod("PUT", obj)).then(response => {
            if (!response.status == 201) {
                throw new Error(response.status);
            }return response.json();
        })
    }
}