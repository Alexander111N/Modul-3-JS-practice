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

export default modal;
export{openModal};
export{closeModalWindow};