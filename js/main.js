//'user strict'

//Messages - output numbers
let result = document.getElementById("result");
// let element = document.getElementById("result");

//Initialization
let iterationsNumber = 15;
let firstDice;
let secondDice;
let total = 0;
//let skippedNumberOne = 8;
//let skippedNumberTwo = 13;

//Logical part
for (let i = 0 ; i < iterationsNumber ; i++){
    if (i === 8 || i === 13) {
        continue;
    }
    firstDice = Math.floor((Math.random() * 6) + 1); //Random output of the dice number
    secondDice = Math.floor((Math.random() * 6) + 1); //Random output of the dice number

    result.innerHTML += "Первая кость: " + first + " " + "Вторая кость: " + second + "<br>";

    if (first === second){
        result.innerHTML += "Выпал дубль. Число:  " + second + "<br>";
    }
    if (first < 3 && second > 4){
        result.innerHTML += "Большой разброс между костями. Разница составляет "+ Math.abs(second - first) + "<br>";
    }

    total += first + second; //Total account
}
result.innerHTML += (total > 100)? "Победа, вы набрали очков " + total: "Вы проиграли, у вас очков: " + total;
//element.innerHTML = result;

