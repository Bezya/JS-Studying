'user strict';
let btn = document.getElementById("play");

function newDate(date){
    /*var tmpDate = new Date(date);
    return tmpDate.getFullYear() + "/" +
        tmpDate.getMonth() + "/" +
        tmpDate.getDate() + " " +
        tmpDate.getHours() + ":" +
        tmpDate.getMinutes();*/
    return moment(date).format('hh:mm DD/MM/YYYY');
}

function transformName(name) {
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

function transformDescription(str){
    if(str.length > 15){
        return str.substring(0,15)+ '...';
    }
    return str;
}

function filterAllVisible(arr){
    return arr.filter(function(item){
        return item.isVisible;
    })
}
function modifyArr(arr){
    return arr.map(function (item){
        return {
            url: 'http://' + item.url,
            name: transformName(item.name),
            params: item.params.status + '=>' + item.params.progress,
            description: transformDescription(item.description),
            date: newDate(item.date),
            isVisible: item.params.status
        }
    });
}

function transform() {
    let newArrData = [];
    data.splice(6,1);
    data.forEach(function(item, index){
        newArrData.push({
            url: item.url,
            name: item.name,
            params: item.params,
            description : item.description,
            date : item.date
        })
    });

    newArrData = modifyArr(newArrData);
    console.log(filterAllVisible(newArrData));
}


btn.addEventListener("click", transform);