'user strict';
(function() {
    let replaceItemTemplate = '<div class="col-sm-3 col-xs-6">\
                                        <img src="$url" alt="$name" class="img-thumbnail">\
                                        <div class="info-wrapper">\
                                        <div class="text-muted">$name</div>\
                                        <div class="text-muted top-padding">$description</div>\
                                        <div class="text-muted">$date</div>\
                                        </div>\
                                    </div>';
    const transformUrl = str => `http://${str}`;

    const getFormattedDate = date => moment(date).format('YYYY/MM/DD hh:mm');

    const transformName = name => `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;

    const transformDescription = str => (str.length > 15) ? `${str.substring(0, 15)}...` : str;

    const makeNewArrOfCars = arr => arr.map(item => ({ url, name, description, date } = item));

    const modifiedArrOfCars = arr => {
        return arr.map(item => {
            const { url, name, description, date } = item;
        return {
            url: transformUrl(url),
            name: transformName(name),
            description: transformDescription(description),
            date: getFormattedDate(date)
            }
        })
    };
    let btn = document.getElementById("play"),
        firstBlock = document.querySelector('#first-line'),
        secondBlock = document.querySelector('#second-line'),
        thirdBlock = document.querySelector('#third-line');

    const iteration = (count, arr) => {
        let result = '';
        for (let i = 0; i < count; i++){
            result += templte(arr[i]);
        }
        return result;
    };


    let typeGalarySelector = document.getElementById("type-selector");

    let countSelector = document.getElementById("line-selector");

    function templte(item) {
        return replaceItemTemplate
            .replace(/\$name/gi, item.name)
            .replace("$url", item.url)
            .replace("$description", item.description)
            .replace("$date", item.date);
    }
    function buildGalleryByReplace(count, arr) {
        switch (count){
            case '1':
                firstBlock.innerHTML = iteration(3, arr);
                break;
            case '2':
                firstBlock.innerHTML = iteration(6,arr);
                break;
            case '0':
                firstBlock.innerHTML = iteration(arr.length, arr);
                break;
        }
        document.querySelector('.first-group').classList.add("show");

    }

    function buildGalleryByTemplate() {
    }
    function buildGalleryByCreateElement() {
    }

    function showGallery() {
        let value = typeGalarySelector.value;
        let count = countSelector.value;
        switch (value){
            case '1':
                buildGalleryByReplace(count, modifiedArrOfCars(makeNewArrOfCars(data)));
                displayCurrentBlock(value);
                break;
            case '2':
                console.log(value);
                break;
            case '3':
                console.log(value);
                break;
        }
    }
    function displayCurrentBlock(value) {
        document.querySelector('.first-group').classList.add("hide");
        document.querySelector('.second-group').classList.add("hide");
        document.querySelector('.third-group').classList.add("hide");

        switch (value){
            case '1':
                document.querySelector('.first-group').classList.add("show");
                break;
                case '2':

                    break;
                case '3':

                    break;
            }
    }
    function init() {
        let secondItemTemplate = `<div class="col-sm-3 col-xs-6">\
    <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
    <div class="info-wrapper">\
        <div class="text-muted">${item.name}</div>\
        <div class="text-muted top-padding">${item.description}</div>\
        <div class="text-muted">${item.date}</div>\
    </div>\
    </div>`;

        //secondBlock.innerHTML = secondItemTemplate;
    }
    btn.addEventListener("click", showGallery);
})();





