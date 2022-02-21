/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator(){
    //Calc

    const result = document.querySelector('.calculating__result span');

    let sex = 'female',
        age, height, weight,
        ratio = '1.375';

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', 1.375)
    };

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    };

    function initLocalSettings(settings, activeClass) {
        let elements = document.querySelectorAll(settings);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            };
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            };
        })
    };
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !age || !height || !weight || !ratio) {
            result.textContent = '0';
            return;
        };

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    };
    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                elements.forEach(element => {
                    element.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        })



    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value
                    break;
                case 'weight':
                    weight = +input.value
                    break;
                case 'age':
                    age = +input.value
                    break;

            }
            calcTotal();
        })
    }
    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

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
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


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
    
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu')
        .then((data) => {
            data.forEach(({ img, title, descr, price }) => {
                new MenuCart(img, title, descr, price, '.menu .container', 'menu__item').menuItemBlock()
            })
        });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/deadline.js":
/*!********************************!*\
  !*** ./js/modules/deadline.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function deadline(id,deadline){
    // deadline

   

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - new Date(),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            let t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }
    setClock(id, deadline);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deadline);

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
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function forms(modalTimer,formSelector) {
    //submit

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                 display:block;
                 margin: 0 auto;
             `
            form.appendChild(statusMessage);
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            ;(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                })

        });

    }
    function showThanksModal(message) {
        const modalDialog = document.querySelector('.modal__dialog');

        modalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalBlockShow)('.modal',modalTimer);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
         <div class="modal__content">
             <div class="modal__close" data-close>×</div>
             <div class="modal__title">${message}</div>
         </div>
        `
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalBlockHide)('.modal');
        }, 4000)
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "modalBlockShow": () => (/* binding */ modalBlockShow),
/* harmony export */   "modalBlockHide": () => (/* binding */ modalBlockHide)
/* harmony export */ });



function modalBlockHide(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

function modalBlockShow(modalSelector,modalTimer) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimer) {
        clearInterval(modalTimer);
    }
};

function modal(modalTrigger,modalSelector,modalTimer){
    //Modal

    const button = document.querySelectorAll(modalTrigger),
        modal = document.querySelector(modalSelector);


    button.forEach((item) => {
        item.addEventListener('click', () => modalBlockShow(modalSelector,modalTimer))
    })


  
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            modalBlockHide(modalSelector)
        }
    })
    document.addEventListener('keydown', (e) => {
        if (e.key == 'Escape' && modal.classList.contains('show')) {
            modalBlockHide(modalSelector);
        }
    })



    const deleteModalEvent = ()=>{
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ){
            modalBlockShow(modalSelector,modalTimer)
            window.removeEventListener('scroll',deleteModalEvent)
        } 
    }
    
   window.addEventListener('scroll',deleteModalEvent)
};

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
function slider({currentCounter,totalCounter,slide,wrapper,container,field,prevArrow,nextArrow}){
    //slider
    const current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        slides = document.querySelectorAll(slide), //offerSlide
        slidesWrapper = document.querySelector(wrapper),
        slider = document.querySelector(container),
        slidesField = document.querySelector(field),
        //slides elements 

        //buttons
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),

        //styles slidesWrapper width
        width = window.getComputedStyle(slidesWrapper).width;



    let slideIndex = 1,
        offset = 0;//отступ

    slider.style.position = 'relative';
    const indicators = document.createElement('ol');

    let dots = [];//array 

    indicators.classList.add('carousel-indicators');
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
     `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement('li');
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
         `
        if (i == 0) {
            dot.style.opacity = 1
        }
        indicators.append(dot)
        dots.push(dot)
    }
    let slideDot = document.querySelectorAll('[data-slide-to]');
    //slideDot
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = 'all 0.5s';

    slidesWrapper.style.overflow = 'hidden';

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slides.forEach(slide => {
        slide.style.width = width;
    })
    // add zero in num function 
    function addZero() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        };
    }
    //navigation dot function
    function showNav() {
        slideDot.forEach(dot => {
            dot.style.opacity = 0.5;
        })
        if (slideDot == slides.length) {
            slideDot = 0
        }
        slideDot[slideIndex - 1].style.opacity = 1
    };
    function deleteNoDigits(str) {
        return +str.replace(/\D/g, '')
    }
    //slide button
    next.addEventListener('click', () => {
        if (offset == +width.slice(0,width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0,width.length - 2) ;
        }
        slidesField.style.transform = ` translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++
        };

        addZero();

        showNav()
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0,width.length - 2) * (slides.length - 1)//deleteNoDigits(width)
        } else {
            offset -= +width.slice(0,width.length - 2) ;
        }
        slidesField.style.transform = ` translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--
        };

        addZero();
        showNav()
    });

    slideDot.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = +width.slice(0,width.length - 2)  * (slideTo - 1);

            slidesField.style.transform = ` translateX(-${offset}px)`;
            addZero();
            showNav();
        })
    });
};
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
function tabs(tabheaderItem,tabContent,tabheaderItems,tabheaderActive){
     //tabs
    let tabs = document.querySelectorAll(tabheaderItem),
        tabcontent = document.querySelectorAll(tabContent),
        tabsParent = document.querySelector(tabheaderItems);

    function hideTabContent() {
        tabs.forEach((item) => {
            item.classList.remove(tabheaderActive)
        })
        tabcontent.forEach((tab) => {
            tab.style.display = 'none'
        })
    }

    function showTabContent(i = 0) {
        tabcontent[i].style.display = 'block'
        tabs[i].classList.add(tabheaderActive)
    }


    hideTabContent();
    showTabContent();
   
    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && e.target.classList.contains(tabheaderItem.slice(1))) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })
    //3962
    //const modalTimer = setTimeout(modalBlockShow,3000)


}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getData": () => (/* binding */ getData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};
const getData = async (url) => {
    let res = await fetch(url)

    return await res.json();

};


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
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_deadline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/deadline */ "./js/modules/deadline.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");








window.addEventListener('DOMContentLoaded',()=>{
    const modalTimer = setTimeout(()=> (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.modalBlockShow)('.modal'),3000);

    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_deadline__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer','2022-03-01');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]','.modal',modalTimer);
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])(modalTimer,'form');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        currentCounter:'#current',
        totalCounter:'#total',
        slide:'.offer__slide',
        wrapper:'.offer__slider-wrapper',
        container:'.offer__slider',
        field:'.offer__slider-inner',
        prevArrow:'.offer__slider-prev',
        nextArrow:'.offer__slider-next'
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_6__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
  
})

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map