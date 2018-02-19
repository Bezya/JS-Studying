'use strict';
(function(){
    let dateHtml = document.querySelector('.today-date'),
        // timeHtml = document.getElementsByClassName('number'),
        timerHours = document.querySelector('.hours'),
        timerMinutes = document.querySelector('.minutes'),
        timerSeconds = document.querySelector('.seconds'),
        dayCounter = document.querySelector('.day-counter');

    let dayArr = ['воскресенье', 'понедельник', 'вторник', 'среда', 'честверг', 'пятница', 'суббота'];
    let monthArr = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
                    'сентября', 'октября', 'ноября', 'декабря'];

    const currentDate = new Date();

    const untilDate = new Date('01-01-2019');

    const correctCase = number => {
        let arr = ['день', 'дня', 'дней'];
        if(number % 10 === 1){
            return arr[0]
        }else if(number % 10 === 2 || 3 || 4){
            return arr[1];
        }else{
            return arr[2];
        }
    };

    const getDate = date => {
        dateHtml.innerHTML = `Сегодня: 
                            ${dayArr[date.getDay()]}, 
                            ${date.getDate()} 
                            ${monthArr[date.getMonth()]}`;
    };

    const showTimer = date => {
            let checkTime = t => (t < 10)? t = "0" + t : t ;
            let hh = date.getHours(),
                mm = date.getMinutes(),
                ss = date.getSeconds();

            timerHours.innerHTML = checkTime(hh);
            timerMinutes.innerHTML = checkTime(mm);
            timerSeconds.innerHTML = checkTime(ss);
    };

    function runTimer(){
        setInterval(() => showTimer(new Date()), 1000);
    }

    function daysCounter(date1, date2){
        let countedDate =  Math.floor((date2 - date1)/1000/60/60/24);
        dayCounter.innerHTML = `&nbsp${countedDate} ${correctCase(countedDate)}`;
    }

    function init(){
        getDate(currentDate);
        runTimer();
        daysCounter(currentDate, untilDate);
    }
    init();
})();

/*  function showTimer2(date){
        timeHtml[5].innerHTML = date.getSeconds() % 10;
        timeHtml[4].innerHTML = Math.floor(date.getSeconds()/10);
        timeHtml[3].innerHTML = date.getMinutes() % 10;
        timeHtml[2].innerHTML = Math.floor(date.getMinutes()/10);
        timeHtml[1].innerHTML = date.getHours() % 10;
        timeHtml[0].innerHTML = Math.floor(date.getHours()/10);
    }*/


