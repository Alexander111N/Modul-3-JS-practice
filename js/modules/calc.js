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

export default calc;