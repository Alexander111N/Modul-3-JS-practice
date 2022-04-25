
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

const deadline = '2022-05-19';

function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if(t <= 0){
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0;
    } else{
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor(t / (1000 * 60 * 60) % 24 ),
        minutes = Math.floor(t / (1000 * 60) % 60 ),
        seconds = Math.floor((t / 1000) % 60 );
    }
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

// Modal

const connectUsBtns = document.querySelectorAll('[data-modal]');
const closeModal = document.querySelector('[data-close]');
const modalWindow = document.querySelector('.modal');

function openModal() {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearTimeout(openModaltimer);
}

connectUsBtns.forEach(item => {
    item.addEventListener('click', openModal);
});

function closeModalWindow() {
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

closeModal.addEventListener('click', closeModalWindow);

modalWindow.addEventListener('click', (e) => {
    if(e.target === modalWindow) {
        closeModalWindow();
    }
});

document.addEventListener('keydown', (e) => {
    if(e.code === "Escape" && modalWindow.classList.contains('show')){ 
        closeModalWindow();
    }
});

const openModaltimer = setTimeout(openModal, 5000);

function openModalByScroll() {
    if(document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight){
        openModal();
        window.removeEventListener('scroll', openModalByScroll);
    }
}

window.addEventListener('scroll', openModalByScroll);