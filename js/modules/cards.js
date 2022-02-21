import {getData} from '../services/services'

function cards(){
    // menu 

    let menuItemCart = document.querySelector('.menu__field');



    class MenuCart {
        constructor(img, subtitle, descr, cost, parentSelector, ...classes) {
            this.img = img,
                this.subtitle = subtitle,
                this.descr = descr,
                this.cost = cost,
                this.tansfer = 28,
                this.classes = classes,
                this.parent = document.querySelector(parentSelector),
                this.changeToUAH()
        };
        changeToUAH() {
            this.cost = +this.cost * this.tansfer
        }
        menuItemBlock() {
            const element = document.createElement("div");

            if (this.classes.length == 0) {
                element.classList.add('menu__item')
            } else {
                this.classes.forEach(className => element.classList.add(className))
            };
            element.innerHTML = `
            <img src=${this.img} alt="vegy">
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">Меню '${this.descr}' </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.cost}</span> грн/день</div>
            </div>`;

            this.parent.append(element)
        }
    }
    
    getData('http://localhost:3000/menu')
        .then((data) => {
            data.forEach(({ img, title, descr, price }) => {
                new MenuCart(img, title, descr, price, '.menu .container', 'menu__item').menuItemBlock()
            })
        });
};

export default cards;