/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
   /// Калькулятор. Урок 97 

   const result = document.querySelector('.calculating__result span');
   let sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : 'female',
       height, weight, age, 
       ratio = localStorage.getItem('ratio') ? localStorage.getItem('ratio') : 1.375;

   function initLocalSettings(parentSelector, activeClass){
       const elements = document.querySelectorAll(`${parentSelector} div`);

       elements.forEach(elem => {
           elem.classList.remove(activeClass);

           if(elem.getAttribute('id') === localStorage.getItem('sex')){
               elem.classList.add(activeClass);
           }
           if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
               elem.classList.add(activeClass);
           }
       });       
   }

   initLocalSettings('#gender', 'calculating__choose-item_active'); 
   initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');

   function calcTotal(){
       if(!sex || !height || !weight || !age || !ratio){
           result.textContent = `не все поля заполнены`;
           return;
       }

       if(sex === 'female'){
           result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
       }
       else {
           result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
       }
   }

   function getStaticInformation(parentSelector, activeClass){
       let element = document.querySelectorAll(`${parentSelector} div`);

       element.forEach(elem => {
           elem.addEventListener('click', (e) =>{
           if(e.target.getAttribute('data-ratio')){
               ratio = +e.target.getAttribute('data-ratio');
               localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
           }
           else {
               sex = e.target.getAttribute('id');
               localStorage.setItem('sex', e.target.getAttribute('id'));
           }    
   
           element.forEach(elem => {
               elem.classList.remove(activeClass);                          
           });
           e.target.classList.add(activeClass);

           calcTotal();
           });
       });
   }

   function getDynamicInformation(selector){
       const input = document.querySelector(selector);

       input.addEventListener('input', () =>{
           if(input.value.match(/\D/g)){
               input.style.border = '2px solid red';
           } else {
               input.style.border = 'none';
           }

           // let currentinput = input.value.match(/\d/g) || [];  // мое дополнение. input попадают только числа
           // input.value = currentinput.join('');
       
           switch(input.getAttribute('id')){
               case 'height':
                   height =+input.value;
                   break;
               case 'weight':
                   weight =+input.value;
                   break;                   
               case 'age':
                   age =+input.value;
                   break;
           }

           calcTotal();
       });
   }

   getStaticInformation('#gender', 'calculating__choose-item_active'); 
   getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
   getDynamicInformation('#height');
   getDynamicInformation('#weight');
   getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");


function cards(){
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

    (0,_services_services_js__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");



function forms(formSelector,openModaltimer){
   //Forms.  отправка данных на сервер

   const forms = document.querySelectorAll(formSelector);

   const message = {
       loading:'img/form/spinner.svg',
       success:'Загрузка данных на сервер прошла успешно',
       failure:'Что-то пошло не так'
   } 

   forms.forEach(item=> {
       bindPostData(item);
   });

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

           (0,_services_services_js__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
       (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', openModaltimer);

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
           (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModalWindow)('.modal');
       }, 3000);
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModalWindow": () => (/* binding */ closeModalWindow),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, openModaltimer) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';   // стиль overflow не позволяет прокручивать страницу за модальным окном
    if(openModaltimer){
        clearTimeout(openModaltimer); 
    }
}

function closeModalWindow(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';      // Включаем прокрутку. Снова можем прокручивать страницу
}


function modal(triggerSelector, modalSelector, openModaltimer){
    // Modal

    const connectUsBtns = document.querySelectorAll(triggerSelector);
    const modalWindow = document.querySelector(modalSelector);

    connectUsBtns.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, openModaltimer));
    });

    modalWindow.addEventListener('click', (e) => {  
        if(e.target === modalWindow || e.target.getAttribute('data-close') == '') {        // Блок модального окна занимает весь экран, но мы его не видиv
            closeModalWindow(modalSelector);                     // когда попадаем в часть без контента оно закрывается. Читай свой ворд документ
        }                                           // Также проверяем по атрибуту что мы попали в крестик .target.getAttribute('data-close') тогда тоже закрываем
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modalWindow.classList.contains('show')){ 
            closeModalWindow(modalSelector);
        }
    });

    function openModalByScroll() {
        if(document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight){
            openModal(modalSelector, openModaltimer);
            window.removeEventListener('scroll', openModalByScroll);
        }
    }

    window.addEventListener('scroll', openModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({selSlides, selNextSlide, selPrevSlide, selTotalSliders, selCurrentSlider, selSlidesWrapper, selSlidesField, selSlider}){
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

    const slides = document.querySelectorAll(selSlides);       // все слайды
    const nextSlide = document.querySelector(selNextSlide); // стрелка вправо
    const prevSlide = document.querySelector(selPrevSlide); // стрелка влево
    let totalSliders = document.querySelector(selTotalSliders);             // общее количество слайдов
    let currentSlider = document.querySelector(selCurrentSlider);          //  текущее количество слайдов
    let slidesWrapper = document.querySelector(selSlidesWrapper); //
    let slidesField = document.querySelector(selSlidesField);  // это поле должно быть такой ширины чтобы на него поместились все слайды, что у нас есть.
    let width = window.getComputedStyle(slidesWrapper).width;  // ширина окошка через которое мы смотрим на слайды
    let slideIndex = 1;
    let offset = 0; // переменная для смещения по оси X 

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
    const slider = document.querySelector(selSlider);

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

    function addZero(num) {
        if(num >= 0 && num < 10){
            return `0${num}`;
        }
        else {
            return num;
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(selectotTabs, selectorTabsContent, selectorTabsParent, selectoractiveClass){
    // Tabs
    const tabs = document.querySelectorAll(selectotTabs);
    const tabsContent = document.querySelectorAll(selectorTabsContent);
    const tabsParent = document.querySelector(selectorTabsParent);

    function hideTabContent() {
        tabsContent.forEach((item)=>{
            item.style.display = 'none';
        });

        tabs.forEach((item)=> {
            item.classList.remove(selectoractiveClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add(selectoractiveClass);
    }

    tabsParent.addEventListener('click', (event) => {
        let target = event.target;

        if(target && target.classList.contains(selectotTabs.slice(1))){
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(timerSelector, deadline){
    // Timer

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

    setClock(timerSelector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {    // отдельный метод для запроса на сервер
    const res = await fetch(url, {
        method: "POST",
        headers:{'Content-type': 'application/json'}, // эта строчка нужна для json, для formData не нужна
        body: data
    });

    return await res.json(); // эта строка тоже возвращает промис так как потом мы ее обрабатываем при помощи then
}

const getResource = async (url) => {    // отдельный метод для запроса на сервер
    const res = await fetch(url);
    if(!res.ok){  // так делаем потому что ошибка 404 для fetch не является ошиькой и он не попадет в метод catch
        throw new Error(`Ошибка получения данных с сервера ${url}, status: ${res.status}`); 
    }

    return await res.json(); // эта строка тоже возвращает промис так как потом мы ее обрабатываем при помощи then
}


// axios.get('http://localhost:3000/menu') // библиотека axios // этот код делает тоже самое что и getResource
// .then(data => {
//     data.data.forEach(({img, altimg, title, descr, price}) => {
//         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
//     });
// });




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









document.addEventListener('DOMContentLoaded',() => {

    const openModaltimer = setTimeout(()=> (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', openModaltimer), 90000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', openModaltimer);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-12-19');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', openModaltimer);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        selSlides: '.offer__slide',      
        selNextSlide: '.offer__slider-next',
        selPrevSlide: '.offer__slider-prev',
        selTotalSliders: '#total',            
        selCurrentSlider: '#current',         
        selSlidesWrapper: '.offer__slider-wrapper',
        selSlidesField: '.offer__slider-inner',
        selSlider: '.offer__slider'
    });
 
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map