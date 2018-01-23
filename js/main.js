'user strict';
(function() {
    let btn = document.getElementById("play"),
        firstBlock = document.querySelector('#first-line'),
        secondBlock = document.querySelector('#second-line'),
        thirdBlock = document.querySelector('#third-line');

    let typeGallerySelector = document.getElementById("type-selector");

    let countSelector = document.getElementById("line-selector");

    const transformUrl = str => `http://${str}`;

    const transformName = name => `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;

    const transformDescription = str => (str.length > 15) ? `${str.substring(0, 15)}...` : str;

    const getFormattedDate = date => moment(date).format('YYYY/MM/DD hh:mm');

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

    /*const iteration = (count, arr, template) => {
        let result = '';
        for (let i = 0; i < count; i++) {
            result += template(arr[i]);
        }
        return result;
    };

    let selectNumberOfImages = (count, arr, numberOfBlock) => {
        switch (count) {
            case '1':
                numberOfBlock.innerHTML = iteration(3, arr);
                break;
            case '2':
                numberOfBlock.innerHTML = iteration(6, arr);
                break;
            case '0':
                numberOfBlock.innerHTML = iteration(arr.length, arr);
                break;
        }
    };*/

    const displayCurrentBlock = value => {
        document.querySelector('.first-group').classList.add("hide");
        document.querySelector('.second-group').classList.add("hide");
        document.querySelector('.third-group').classList.add("hide");

        switch (value) {
            case '1':
                document.querySelector('.first-group').classList.add("show");
                break;
            case '2':
                document.querySelector('.second-group').classList.add("show");
                break;
            case '3':
                document.querySelector('.third-group').classList.add("show");
                break;
        }
    };

    function buildGalleryByReplace(count, arr) {
        let replaceItemTemplate = '<div class="col-sm-3 col-xs-6">\
                                        <img src="$url" alt="$name" class="img-thumbnail">\
                                        <div class="info-wrapper">\
                                        <div class="text-muted">$name</div>\
                                        <div class="text-muted top-padding">$description</div>\
                                        <div class="text-muted">$date</div>\
                                        </div>\
                                    </div>';

        let template = item => {
            return replaceItemTemplate
                .replace(/\$name/gi, item.name)
                .replace("$url", item.url)
                .replace("$description", item.description)
                .replace("$date", item.date);
        }

        // iteration(count, arr, template);
        let iteration = (count, arr) => {
            let result = '';
            for (let i = 0; i < count; i++) {
                result += template(arr[i]);
            }
            return result;
        };

        //selectNumberOfImages(count, arr, firstBlock);
        switch (count) {
            case '1':
                firstBlock.innerHTML = iteration(3, arr);
                break;
            case '2':
                firstBlock.innerHTML = iteration(6, arr);
                break;
            case '0':
                firstBlock.innerHTML = iteration(arr.length, arr);
                break;
        }

        document.querySelector('.first-group').classList.add("show");
    };

    function buildGalleryByTemplate(count, arr) {

        // iteration(count, arr, secondItemTemplate);
        let iteration = (count) => {
            let result = '';
            for (let i = 0; i < count; i++) {
                let secondItemTemplate = `<div class="col-sm-3 col-xs-6">\
                                    <img src="${arr[i].url}" alt="${arr[i].name}" class="img-thumbnail">\
                                    <div class="info-wrapper">\
                                        <div class="text-muted">${arr[i].name}</div>\
                                        <div class="text-muted top-padding">${arr[i].description}</div>\
                                        <div class="text-muted">${arr[i].date}</div>\
                                    </div>\
                                    </div>`;
                result += secondItemTemplate;
            }
            return result;
        };

        //selectNumberOfImages(count, arr, secondBlock);
        switch (count) {
            case '1':
                secondBlock.innerHTML = iteration(3, arr);
                break;
            case '2':
                secondBlock.innerHTML = iteration(6, arr);
                break;
            case '0':
                secondBlock.innerHTML = iteration(arr.length, arr);
                break;
        }

        document.querySelector('.second-group').classList.add("show");
    };

    //function buildGalleryByCreateElement() {
    //}

    function showGallery() {
        let value = typeGallerySelector.value;
        let count = countSelector.value;
        switch (value) {
            case '1':
                buildGalleryByReplace(count, modifiedArrOfCars(makeNewArrOfCars(data)));
                displayCurrentBlock(value);
                break;
            case '2':
                buildGalleryByTemplate(count, modifiedArrOfCars(makeNewArrOfCars(data)));
                displayCurrentBlock(value);
                break;
            case '3':
                //buildGalleryByCreateElement(count, modifiedArrOfCars(makeNewArrOfCars(data)));
                //displayCurrentBlock(value);
                break;
        }
    };

    btn.addEventListener("click", showGallery);
})();
