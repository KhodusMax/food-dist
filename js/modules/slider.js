function slider() {

    const slides = document.querySelectorAll('.offer__slide');
    const slider = document.querySelector('.offer__slider');
    const next = document.querySelector('.offer__slider-next');
    const prev = document.querySelector('.offer__slider-prev');
    const current = document.querySelector('#current');
    const total = document.querySelector('#total');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const width = slidesWrapper.offsetWidth;
    const slidesField = document.querySelector('.offer__slider-inner');
    let slideIndex = 1;
    let offset = 0;
    let dots = [];
    let currentDotIndex = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 1; i < slides.length + 1; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        indicators.append(dot);

        if (i === 1) {
            dot.classList.add('dot-active');
        }

        dots.push(dot);
    }

    next.addEventListener('click', moveNext);

    prev.addEventListener('click', movePrev);

    dots.forEach(dot => {
        dot.addEventListener('click', () => {

            dotActiv(dot);

            offset = (width * dots.indexOf(dot));
            slideIndex = dots.indexOf(dot) + 1;

            slidesField.style.transform = `translateX(-${offset}px)`;
            current.textContent = numChecker(dots.indexOf(dot) + 1);
        });
    });

    function moveNext(dot) {
        if (offset == width * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += width; 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        current.textContent = numChecker(slideIndex);

        dotActiv(dots[slideIndex - 1]);

    }

    function movePrev(dot) {
        if (offset == 0) {
            offset = width * (slides.length - 1);
        } else {
            offset -= width;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        current.textContent = numChecker(slideIndex);

        dotActiv(dots[slideIndex - 1]);

    }

    function dotActiv(dot) {
        dots[currentDotIndex].classList.remove('dot-active');
        dot.classList.add('dot-active');
        currentDotIndex = dots.indexOf(dot);
    }

    function numChecker(num) {
        if (num >= 10) {
            return num;
        } else {
            return `0${num}`;
        }
    }

    // function showSlide(i) {
    //     sliders[i-1].classList.remove('hide');
    // }

    // function hideSliders() {
    //     sliders.forEach(elem => {
    //         elem.classList.add('hide');
    //     });
    // }

    // function numChecker(num) {
    //     if (num >= 10) {
    //         return num;
    //     } else {
    //         return `0${num}`;
    //     }
    // }

    // hideSliders();
    // showSlide(count);

    // total.textContent = numChecker(sliders.length);
    // current.textContent = numChecker(count);

    // next.onclick = () => {

    //     count++;

    //     if(count > sliders.length) {
    //         count = 1;
    //     }

    //     current.textContent = numChecker(count);

    //     hideSliders();
    //     showSlide(count);
    // };

    // prev.onclick = () => {

    //     count--;
        
    //     if(count < 1) {
    //         count = sliders.length;
    //     }

    //     current.textContent = numChecker(count);

    //     hideSliders();
    //     showSlide(count);
    // };

}

export default slider;