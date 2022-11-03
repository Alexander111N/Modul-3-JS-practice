import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal'

document.addEventListener('DOMContentLoaded',() => {

    const openModaltimer = setTimeout(()=> openModal('.modal', openModaltimer), 90000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', openModaltimer);
    timer('.timer', '2022-12-19');
    cards();
    calc();
    forms('form', openModaltimer);
    slider({
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