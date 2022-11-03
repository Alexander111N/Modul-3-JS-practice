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

export default slider;