import{getResource} from '../services/services.js'

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

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
}

export default cards;