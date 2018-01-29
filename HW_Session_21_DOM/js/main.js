 'user strict';
(function() {
    let domElements = {
        btn: document.getElementById("play"),

        firstGroup: document.querySelector('.first-group'),
        secondGroup: document.querySelector('.second-group'),
        thirdGroup: document.querySelector('.third-group'),

        firstBlock: document.querySelector('#first-line'),
        secondBlock: document.querySelector('#second-line'),
        thirdBlock: document.querySelector('#third-line'),

        typeGallerySelector: document.querySelector('#type-selector'),
        countGallerySelector: document.querySelector('#line-selector')
    };

    const domElementsArrofGroups = [domElements.firstGroup, domElements.secondGroup, domElements.thirdGroup];

    const domElementsArrofBlocks = [domElements.firstBlock, domElements.secondBlock, domElements.thirdBlock];

    const transformUrl = str => (str.indexOf('http://') !== 0) ? `http://${str}` : `${str}`;

    const transformName = name => `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;

    const transformDescription = str => (str.length > 15) ? `${str.substring(0, 15)}...` : str;

    const getFormattedDate = date => moment(date).format('YYYY/MM/DD hh:mm');

    const templateForReplace = item => {
        let template = '<div class="col-sm-3 col-xs-6">\
                                    <img src="$url" alt="$name" class="img-thumbnail">\
                                            <div class="info-wrapper">\
                                            <div class="text-muted">$name</div>\
                                            <div class="text-muted top-padding">$description</div>\
                                            <div class="text-muted">$date</div>\
                                        </div>\
                                    </div>';
        return template
            .replace(/\$name/gi, transformName(item.name))
            .replace("$url", transformUrl(item.url))
            .replace("$description", transformDescription(item.description))
            .replace("$date", getFormattedDate(item.date));
    };

    const templateForES6 = item => {
        return `<div class="col-sm-3 col-xs-6">\
                    <img src="${transformUrl(item.url)}" alt="${transformName(item.name)}" class="img-thumbnail">\
                    <div class="info-wrapper">\
                        <div class="text-muted">${transformName(item.name)}</div>\
                        <div class="text-muted top-padding">${transformDescription(item.description)}</div>\
                        <div class="text-muted">${getFormattedDate(item.date)}</div>\
                    </div>\
                </div>`;
    };

    const templateForCreateElement = item => {
        let div = document.createElement('div'),
            img = document.createElement('img'),
            wrapper = document.createElement('div'),
            divName = document.createElement('div'),
            divDescription = document.createElement('div'),
            divDate = document.createElement('div');

        div.classList.add('col-sm-3', 'col-xs-6');
        img.classList.add('img-thumbnail');
        img.setAttribute('src', transformUrl(item.url));
        img.setAttribute('alt', transformName(item.name));
        wrapper.classList.add('info-wrapper');

        divName.classList.add('text-muted');
        divName.textContent = transformName(item.name);
        divDescription.classList.add('text-muted', 'top-padding');
        divDescription.textContent = transformDescription(item.description);
        divDate.classList.add('text-muted');
        divDate.textContent = getFormattedDate(item.date);

        div.appendChild(img);
        div.appendChild(wrapper);
        wrapper.appendChild(divName);
        wrapper.appendChild(divDescription);
        wrapper.appendChild(divDate);

        return div;
    };

    const templateMap = [templateForReplace, templateForES6, templateForCreateElement];

    const getIterationWithResult = (count, arr, template) => {
        let result = '';
        let resultObj = document.createElement('div');

        for (let i = 0; i < count; i++) {
            let res = template(arr[i]);
            if (typeof res === 'string') {
                result += res;
            } else resultObj.appendChild(res);
        }
        return result || resultObj;
    };

    const getNumberOfImages = arr => {
        let count = domElements.countGallerySelector.value;
        return (count === '1') ? 3 : (count === '2') ? 6 : arr.length;
    };

    const buildGalleryByTmp = (count, value, arr) => {
        let numberOfImages = getNumberOfImages(arr);
        return getIterationWithResult(numberOfImages, arr, templateMap[value]);
    };

    const displayCurrentBlock = value => {
        for (let i = 0; i < domElementsArrofGroups.length; i++) {
            if (i === value) {
                domElementsArrofGroups[i].classList.remove("hide");
                domElementsArrofGroups[i].classList.add('show');
            } else {
                domElementsArrofGroups[i].classList.add("hide");
                domElementsArrofGroups[i].classList.remove('show');
            }
        }
    };

    const insertHtmlToDOM = (html, value) => {
        if (typeof html === 'string') {
            domElementsArrofBlocks[value].innerHTML = html;
        } else {
            domElementsArrofBlocks[value].innerHTML = '';
            domElementsArrofBlocks[value].appendChild(html);
        }
    };

    function init() {
        let value = domElements.typeGallerySelector.value - 1;
        let count = domElements.countGallerySelector.value;

        let htmlData = buildGalleryByTmp(count, value, data);
        displayCurrentBlock(value);
        insertHtmlToDOM(htmlData, value);
    }
    domElements.btn.addEventListener("click", init);
})();
