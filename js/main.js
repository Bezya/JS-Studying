'user strict';
let btn = document.getElementById("play");

const getFormattedDate = date => moment(date).format('YYYY/MM/DD hh:mm');

const transformName = name => `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;

const transformUrl = str => `http://'${str}`;

const transformDescription = str => (str.length > 15) ? `${str.substring(0, 15)}...` : str;

const transformStr = (param1, param2) => `${param1}=>${param2}`;

const filterAllVisible = arr => arr.filter(item => item.isVisible);

const cutElement = (arr, element) => arr.filter((item, i) => i !== element);

const makeNewArr = arr => arr.map(item => ({url, name, params, description, date} = item));

const printResult = result => console.log(result);

function modifiedArr(arr) {
    return arr.map(item => {
        const {url, name, params, description, date} = item;
        return {
            url: transformUrl(url),
            name: transformName(name),
            params: transformStr(params.status, params.progress),
            description: transformDescription(description),
            date: getFormattedDate(date),
            isVisible: params.status
        }
    });
}

let transform = () => printResult(filterAllVisible(modifiedArr(makeNewArr(cutElement(data, 5))))); //let newArrData = makeNewArr(cutElement(data, 5));

btn.addEventListener("click", transform);
