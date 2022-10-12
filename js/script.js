
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
                this.element = 'menu__item';        // создаем дополнительное свойство у объекта this
                element.classList.add(this.element);  // помещаем это дополнительное свойство в const element.  Это два разных element
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

    const getResource = async (url) => {    // отдельный метод для запроса на сервер
        const res = await fetch(url);
        if(!res.ok){  // так делаем потому что ошибка 404 для fetch не является ошиькой и он не попадет в метод catch
            throw new Error(`Ошибка получения данных с сервера ${url}, status: ${res.status}`); 
        }

        return await res.json(); // эта строка тоже возвращает промис так как потом мы ее обрабатываем при помощи then
    }

    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    axios.get('http://localhost:3000/menu') // библиотека axios
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });


    // let b = new MenuCard(            // создал карточку для проверки.преподаватель удалял все карточки из html и сделал их через объекты класса. я пока так не сделал.
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     '11Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     560,
    //     '.menu .container',
    //     // тут параметры для передачи в ...classes
    // ).render();

    //Forms.  отправка данных на сервер

    const forms = document.querySelectorAll('form');

    const message = {
        loading:'img/form/spinner.svg',
        success:'Загрузка данных на сервер прошла успешно',
        failure:'Что-то пошло не так'
    } 

    forms.forEach(item=> {
        bindPostData(item);
    });

    const postData = async (url, data) => {    // отдельный метод для запроса на сервер
        const res = await fetch(url, {
            method: "POST",
            headers:{'Content-type': 'application/json'}, // эта строчка нужна для json, для formData не нужна
            body: data
        });

        return await res.json(); // эта строка тоже возвращает промис так как потом мы ее обрабатываем при помощи then
    }

    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // отменяет стандартное поведение браузера. В данном случаеотменяет перезагрузку страницы при отправке формы.

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
            formData.forEach(function(value,key){      // весь этот код может быть заменен на object = Object.fromEntries(formData.entries())
                object[key] = value;
            });
            const json = JSON.stringify(object); // конвертируем object к формату json. Объект new FormData нельзя было так конвертировать. Это особый объект.

            
            //request.send(formData); // для отправки обычнго формата FormData
            //request.send(json); // для отправки json формата

            postData('http://localhost:3000/requests', json)
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

    // Слайдер. Урок 92.

        // 1-й вариант слайдера

    // const slides = document.querySelectorAll('.offer__slide');       // все слайды
    // const nextSlide = document.querySelector('.offer__slider-next'); // стрелка вправо
    // const prevSlide = document.querySelector('.offer__slider-prev'); // стрелка влево
    // let totalSliders = document.querySelector('#total');             // общее количество слайдов
    // let currentSlider = document.querySelector('#current');          //  текущее количество слайдов
    // let slideIndex = 1;
    // showSlides(slideIndex);
    // totalSliders.textContent = addZero(slides.length);  // этот функционал тут а не внутри showSlides, потому что каждый раз вызывая функцию showSlides
    //                                                     // у нас будет обновляться textContent, т.е. он будет мигать на странице.

    // function showSlides(index){
    //     slides.forEach(item => item.style.display = 'none');
    //     slides[index - 1].style.display = 'block';
    //     currentSlider.textContent = addZero(index);
    // }

    // nextSlide.addEventListener('click',() =>{
    //     slideIndex++;
    //     if(slideIndex > slides.length)
    //         slideIndex = 1;           
    //     showSlides(slideIndex);
    // });

    // prevSlide.addEventListener('click',() =>{
    //     slideIndex--;
    //     if(slideIndex < 1)
    //         slideIndex = slides.length;       
    //     showSlides(slideIndex);
    // });

    // конец первого варианта слайдера
    
    // 2-й вариант слайдера. По типу карусели

    const slides = document.querySelectorAll('.offer__slide');       // все слайды
    const nextSlide = document.querySelector('.offer__slider-next'); // стрелка вправо
    const prevSlide = document.querySelector('.offer__slider-prev'); // стрелка влево
    let totalSliders = document.querySelector('#total');             // общее количество слайдов
    let currentSlider = document.querySelector('#current');          //  текущее количество слайдов
    let slidesWrapper = document.querySelector('.offer__slider-wrapper'); //
    let slidesField = document.querySelector('.offer__slider-inner');  // это поле должно быть такой ширины чтобы на него поместились все слайды, что у нас есть.
    let width = window.getComputedStyle(slidesWrapper).width;  // ширина окошка через которое мы смотрим на слайды
    let slideIndex = 1;
    offset = 0; // переменная для смещения по оси X 

    totalSliders.textContent = addZero(slides.length);
    currentSlider.textContent = addZero(slideIndex);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;  // каждому слайду устанавливаем ширину равную ширине окошка(slidesWrapper) через которые мы смотрим на слайды
    });

    nextSlide.addEventListener('click', () => {
        if(offset == +width.replace(/\D/g, '') * (slides.length - 1) ){
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        slideIndex++;
        if(slideIndex > slides.length)
            slideIndex = 1;          
        currentSlider.textContent = addZero(slideIndex);

        dots.forEach(dot => dot.style.opacity = '0.5');  // обесцвечиваем все точки 
        dots[slideIndex - 1].style.opacity = '1.0'; // подсвечиваем нужную нам точку
    });

    prevSlide.addEventListener('click', () => {
        if(offset == 0 ){
            offset = +width.replace(/\D/g, '') * (slides.length - 1);
        } else {
            offset -= +width.replace(/\D/g, '');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
      
        slideIndex--;
        if(slideIndex < 1)
            slideIndex = slides.length;       
        currentSlider.textContent = addZero(slideIndex);
        
        dots.forEach(dot => dot.style.opacity = '0.5');  // обесцвечиваем все точки 
        dots[slideIndex - 1].style.opacity = '1.0'; // подсвечиваем нужную нам точку
    });

    // конец 2-го варианта слайдера


    // Создаем точки на слайде. урок 94.
    const slider = document.querySelector('.offer__slider');

    slider.style.position = 'relative';  // теперь все элементы которые абсолютно будут спозиционированны внутри слайдера будут нормально отображаться
    let dots = [];

    const indicators =document.createElement('ol'); // создаем обертку длянаших точек
    indicators.classList.add('carousel-indicators');   // просто добавляем ему класс чтобы он отличался в html. сейчас на этом классе не висят стили.
    indicators.style.cssText = ` 
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;                      // вешаем стили на нашу обертку чтобы она отображалась
    slider.append(indicators);

    // создаем точки, которые поместим в блок
    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        dots.push(dot); // добавляем все точки в массив
        if(i == 0){
            dot.style.opacity = '1.0';
        }
        indicators.append(dot);  // помещаемкаждую точку в блок
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) =>{
            slideIndex = e.target.getAttribute('data-slide-to');

            offset = +width.replace(/\D/g, '') * (slideIndex - 1); // расчитываем смещение
            slidesField.style.transform = `translateX(-${offset}px)`; // выставялем смещение

            currentSlider.textContent = addZero(slideIndex); // изменение индекса слайда

            dots.forEach(dot => dot.style.opacity = '0.5');  // обесцвечиваем все точки 
            dots[slideIndex - 1].style.opacity = '1.0'; // подсвечиваем нужную нам точку
        });
    });







});