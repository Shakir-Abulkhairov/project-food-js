import  calc  from './modules/calculator';
import  cards from './modules/cards';
import  timer from './modules/deadline';
import  modal, { modalBlockShow } from './modules/modal';
import  forms from'./modules/forms';
import  slider from './modules/slider';
import  tabs from  './modules/tabs';

window.addEventListener('DOMContentLoaded',()=>{
    const modalTimer = setTimeout(()=> modalBlockShow('.modal'),3000);

    calc();
    cards();
    timer('.timer','2022-03-01');
    modal('[data-modal]','.modal',modalTimer);
    forms(modalTimer,'form');
    slider({
        currentCounter:'#current',
        totalCounter:'#total',
        slide:'.offer__slide',
        wrapper:'.offer__slider-wrapper',
        container:'.offer__slider',
        field:'.offer__slider-inner',
        prevArrow:'.offer__slider-prev',
        nextArrow:'.offer__slider-next'
    });
    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
  
})
