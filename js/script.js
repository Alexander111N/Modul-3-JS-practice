
window.addEventListener('DomContentLoaded',() => {

    console.log('123');
    alert('загрузка прошла');
});

document.addEventListener('DOMContentLoaded',() => {

    console.log('123');
    alert('загрузка прошла');


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

    const deadline = '2022-09-19';

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
            const interval = setInterval(updateClock, 1000);

        updateClock();  // Наш setInterval запустится только через секунду и значит целую секунду будут висеть
                        // неправильные данные. Это не красиво. Чтобы этого избежать вызовем обновление таймера сразу.

        function updateClock(){                     // обновляет наш таймер каждую секунду
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
    const modalWindow = document.querySelector('.modal');

    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';   // стиль overflow не позволяет прокручивать страницу за модальным окном
        clearTimeout(openModaltimer);
    }

    connectUsBtns.forEach(item => {
        item.addEventListener('click', openModal);
    });

    function closeModalWindow() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';      // Включаем прокрутку. Снова можем прокручивать страницу
    }

    modalWindow.addEventListener('click', (e) => {  
        if(e.target === modalWindow || e.target.getAttribute('data-close') == '') {        // Блок модального окна занимает весь экран, но мы его не видиv
            closeModalWindow();                     // когда попадаем в часть без контента оно закрывается. Читай свой ворд документ
        }                                           // Также проверяем по атрибуту что мы попали в крестик .target.getAttribute('data-close') тогда тоже закрываем
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modalWindow.classList.contains('show')){ 
            closeModalWindow();
        }
    });

    const openModaltimer = setTimeout(openModal, 10000); // Открывыает мадальное окно "Связаться с нами" через 5 секунд

    function openModalByScroll() {
        if(document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', openModalByScroll);
        }
    }

    window.addEventListener('scroll', openModalByScroll);

    //Создание классов (шаблонов для карточек меню). 79 пункт курса.

    class MenuCard {
        constructor(src, alt, title, discr, price, parent, ...classes){ // в ...classes передаются классы, которые мы хотим добавить к карточке. для каждой карточки может быть разное количество классов.
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.discr = discr;
            this.price = price;
            this.parent = document.querySelector(parent);
            this.classes = classes;
        }

        render(){
            const element = document.createElement('div');
            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }
            else{
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.discr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    let b = new MenuCard(            // создал карточку для проверки.преподаватель удалял все карточки из html и сделал их через объекты класса. я пока так не сделал.
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        '11Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        560,
        '.menu .container',
        // тут параметры для передачи в ...classes
    ).render();

    //Forms.  отправка данных на сервер

    const forms = document.querySelectorAll('form');

    const message = {
        loading:'img/form/spinner.svg',
        success:'Загрузка данных на сервер прошла успешно',
        failure:'Что-то пошло не так'
    } 

    forms.forEach(item=> {
        postData(item);
    });

    function postData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // отменяет стандартноеповедение браузера. В данном случаеотменяет перезагрузку страницы при отправке формы.

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest(); // закоммитил эти строки т.к. сделал отправку через fetch()
            // request.open('POST', 'server.php');  // закоммитил эти строки т.к. сделал отправку через fetch()
            //request.setRequestHeader('Content-type', 'multipart/form-data');  // заголовок не нужен когда используем new XMLHttpRequest(); и ew FormData(form); одновременно
            //request.setRequestHeader('Content-type', 'application/json'); // заголовок нужен если хотим отправить данные в формате  json

            const formData = new FormData(form);
            // если мы хотим отправить данные в формате json мы должны взаимодействовать с объектом FormData.
            // переберем formData и поместим информацию в новый объект
            const object = {};
            formData.forEach(function(value,key){
                object[key] = value;
            });
            const json = JSON.stringify(object); // конвертируем object к формату json. Объект new FormData нельзя было так конвертировать. Это особый объект.

            
            //request.send(formData); // для отправки обычнго формата FormData
            //request.send(json); // для отправки json формата

            fetch('server.php', {
                method: "POST",
                headers:{'Content-type': 'application/json'}, // эта строчка нужна для json, для formData не нужна
                body: json
            }).then(data => data.text())
            .then(data => {
                console.log(data);
                showThankModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThankModal(message.failure);
            }).finally(() => {
                form.reset(); //  очистка данных формы
            });

            // request.addEventListener('load',() =>{   // это код был нужен для new XMLHttpRequest()
            //     if(request.status == 200){
            //         console.log(request.response);
            //         showThankModal(message.success);
            //         form.reset(); //  очистка данных формы
            //         statusMessage.remove();
            //     } else{
            //         showThankModal(message.failure);
            //     }
            // })

        });
    }

    function showThankModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() =>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModalWindow();
        }, 3000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

});