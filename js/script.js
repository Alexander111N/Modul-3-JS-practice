
window.addEventListener('DomContentLoaded',() => {

    console.log('123');
    alert('загрузка прошла');
});

document.addEventListener('DomContentLoaded',() => {

    console.log('123');
    alert('загрузка прошла');
});

// Tabs
const tabs = document.querySelectorAll('.tabheader__item');
const tabsContent = document.querySelectorAll('.tabcontent');
const tabsParent = document.querySelector('.tabheader__items');

function hideTabContent() {
    tabsContent.forEach((item)=>{
        item.style.display = 'none';
    });

    tabs.forEach((item)=> {
        item.classList.remove('tabheader__item_active');
    });
}

function showTabContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
}

tabsParent.addEventListener('click', (event) => {
    let target = event.target;

    if(target && target.classList.contains('tabheader__item')){
        tabs.forEach((item, i) => {
            if(target == item){
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});

hideTabContent();
showTabContent(0);

// Timer

const deadline = '2022-04-19';

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
       days = Math.floor(t / (1000 * 60 * 60 * 24)),
       hours = Math.floor(t / (1000 * 60 * 60) % 24 ),
       minutes = Math.floor(t / (1000 * 60) % 60 ),
       seconds = Math.floor((t / 1000) % 60 );

    return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };

}

function addZero(num) {
    if(num >= 0 && num < 10){
        return `0${num}`;
    }
    else {
        return num;
    }
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds');

    updateClock();
    const interval = setInterval(updateClock, 1000);     

    function updateClock(){
        const t = getTimeRemaining(endtime);
        days.textContent = addZero(t.days);
        hours.textContent = addZero(t.hours);
        minutes.textContent = addZero(t.minutes);
        seconds.textContent = addZero(t.seconds);
        if(t.total <= 0){
            clearInterval(interval);
        }
    }
}

setClock('.timer', deadline);
