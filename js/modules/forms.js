import{openModal, closeModalWindow} from './modal.js';
import{postData} from '../services/services.js'

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
       openModal('.modal', openModaltimer);

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
           closeModalWindow('.modal');
       }, 3000);
   }
}

export default forms;
