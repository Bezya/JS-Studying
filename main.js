'user strict'
(function(){
    //Messages
    let msgFirstPlayerWinner = 'Первый игрок победил!',
        msgSecondPlayerWinner = 'Второй игрок победил!',
        msgDeadHeat = 'Ничья!';

    //Initialization
    let btn = document.getElementById("play"),
        player1 = document.getElementById("player1"),
        player2 = document.getElementById("player2"),
        playerResult = document.getElementById("result");

    //Logical part
    const getPlayerResult = () => Math.floor((Math.random() * 3) + 1);

    const getNameById = (num) => (num === 1) ? 'камень':(num === 2) ? 'ножницы' : 'бумага';

    function determineWinner(player1Choice, player2Choice){
        if(player1Choice === 1 && player2Choice === 2) || (player1Choice === 2 && player2Choice === 3){
        return 1;
    }else if(player2Choice === 1 && player1Choice === 2) || (player2Choice === 2 && player1Choice === 3){
        return 2;
    }else {
        return 3;
    }
    function printResult(num){
        playerResult.innerHTML = (num === 3) ? msgDeadHeat :(num === 2) ? msgSecondPlayerWinner : msgFirstPlayerWinner;
    }
    function runGame() {
        let firstPlayer = getPlayerResult();
        let secondPlayer = getPlayerResult();
        player1.innerHTML = getNameById(firstPlayer);
        player2.innerHTML = getNameById(secondPlayer);

        printResult(determineWinner(firstPlayer, secondPlayer));
    }
    btn.addEventListener("click", runGame);
}());