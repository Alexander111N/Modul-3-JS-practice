
window.addEventListener('DomContentLoaded',() => {

    console.log('123');
    alert('загрузка прошла');
});

document.addEventListener('DomContentLoaded',() => {

    console.log('123');
    alert('загрузка прошла');
});

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

// const timer = setTimeout(function(text){
//     console.log(text);
// }, 2000, 'Hello');

// let count = 0;
// const repeate = setInterval(function(){
//     console.log('интервал');
//     count++;
//     if(count == 10){
//         clearInterval(repeate);
//     }
// }, 1000);

const date = new Date();
console.log(date);
const date1 = new Date(2021, 3, 4, 5);
console.log(date1);
console.log(Date.now());
