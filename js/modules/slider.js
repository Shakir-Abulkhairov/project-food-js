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
export default slider;