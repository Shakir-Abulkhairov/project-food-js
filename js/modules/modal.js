


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

export default modal;
export{modalBlockShow,modalBlockHide};