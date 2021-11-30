/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calcFunc() {

    const genders = document.querySelectorAll('#gender div');
    const height = document.querySelector('#height');
    const weight = document.querySelector('#weight');
    const age = document.querySelector('#age');
    const inps = document.querySelectorAll('.input');
    const chooses = document.querySelectorAll('.calculating__choose_big div');
    const result  = document.querySelector('.calculating__result span');
    const men = {
        genderCoef: 88.36,
        heightCoef: 13.4,
        weightCoef: 4.8,
        ageCoef: 5.7
    };
    const wom = {
        genderCoef: 447.6,
        heightCoef: 9.2,
        weightCoef: 3.1,
        ageCoef: 4.3
    };

    if (!height.value || !weight.value || !age.value) {
        result.textContent = '_____';
    }

    genders.forEach((block) => {
        block.addEventListener('click', (e) => {
            setActive(e.target, genders);
            result.textContent = calc();
        });
    });

    inps.forEach((inp) => {
        inp.addEventListener('change', () => {
            if (inp.value.match(/\D/)) {
                inp.style.background = 'orangered';
            } else {
                inp.style.background = 'white';
            }
            result.textContent = calc();
        });
    });

    chooses.forEach((block) => {
        block.addEventListener('click', (e) => {
            setActive(e.target, chooses);
            result.textContent = calc();
        });
    });

    function setActive(target, blocks) {
        blocks.forEach((block) => {
            block.classList.remove('calculating__choose-item_active');
        });
        target.classList.add('calculating__choose-item_active');
    }

    function calc() {
        let activityCoef;
        let gender;

        genders.forEach((block) => {
            if (block.classList.contains('calculating__choose-item_active')) {
                if (block.getAttribute('value') === 'men') {
                    gender = men;
                } else {
                    gender = wom;
                }
            }
        });

        chooses.forEach((block) => {
            if (block.classList.contains('calculating__choose-item_active')) {
                activityCoef = block.getAttribute('value');
            }
        });

        if (!height.value || !weight.value || !age.value) {
            return '_____';
        }

        return Math.round((gender.genderCoef + (gender.weightCoef * +weight.value) + (gender.heightCoef * +height.value) - (gender.ageCoef * +age.value)) * +activityCoef);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calcFunc);

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



function forms() {

     const forms = document.querySelectorAll('form');
     const message = {
           loading: 'img/form/spinner.svg',
           success: 'Спасибо! Скоро мы с вами свяжемся',
           failure: 'Что-то пошло не так...'
     };
 
     forms.forEach(item => {
         bindPostData(item);
     });
 
     //XML
  
     // function postData(form) {
     //     form.addEventListener('submit', (event) => {
     //         event.preventDefault();
 
     //         const statusMessage = document.createElement('img');
     //         statusMessage.src = message.loading;
     //         statusMessage.style.cssText = `
     //             display: block;
     //             margin: 0 auto;
     //         `;
     //         form.insertAdjacentElement('afterend', statusMessage);
         
     //         const request = new XMLHttpRequest();
     //         request.open('POST', 'server.php');
     //         request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
     //         const formData = new FormData(form);
 
     //         const object = {};
     //         formData.forEach(function(value, key){
     //             object[key] = value;
     //         });
     //         const json = JSON.stringify(object);
 
     //         request.send(json);
 
     //         request.addEventListener('load', () => {
     //             if (request.status === 200) {
     //                 console.log(request.response);
     //                 showThanksModal(message.success);
     //                 statusMessage.remove();
     //                 form.reset();
     //             } else {
     //                 showThanksModal(message.failure);
     //             }
     //         });
     //     });
     // }
 
     //fetch
 
     const postData = async (url, data) => {
         const resp = await fetch(url, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: data
         });
         return await resp.json();
     };
 
     function bindPostData(form) {
         form.addEventListener('submit', (event) => {
             event.preventDefault();
 
             let statusMessage = document.createElement('img');
             statusMessage.src = message.loading;
             statusMessage.style.cssText = `
                 display: block;
                 margin: 0 auto;
             `;
             form.insertAdjacentElement('afterend', statusMessage);
         
             const formData = new FormData(form);
 
             let json = JSON.stringify(Object.fromEntries(formData.entries()));
 
             postData('http://localhost:3000/requests', json)
                 .then(data => {
                 console.log(data);
                 showThanksModal(message.success);
                 statusMessage.remove();
             }).catch(() => {
                 showThanksModal(message.failure);
             }).finally(() => {
                 form.reset();
             });
         });
     }
  
     function showThanksModal(message) {
         const prevModalDialog = document.querySelector('.modal__dialog');
 
         prevModalDialog.classList.add('hide');
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)();
 
         const thanksModal = document.createElement('div');
         thanksModal.classList.add('modal__dialog');
         thanksModal.innerHTML = `
             <div class="modal__content">
                 <div class="modal__close" data-close>×</div>
                 <div class="modal__title">${message}</div>
             </div>
         `;
         document.querySelector('.modal').append(thanksModal);
         setTimeout(() => {
             thanksModal.remove();
             prevModalDialog.classList.add('show');
             prevModalDialog.classList.remove('hide');
             (0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideModal)();
         }, 4000);
     }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function menu() {

    class MenuCreator {
        constructor(src, alt, title, text, price, parentClass, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.parentClass = parentClass;
            this.classes = classes;
            this.exchange = 27;
        }

        render() {
            const priceToUAH = +this.price * this.exchange;
            const menuElem = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes.push('menu__item');
            }

            this.classes.forEach(className => menuElem.classList.add(className));
            
            menuElem.innerHTML = 
               `<img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${priceToUAH}</span> грн/день</div>
                </div>`;

             document.querySelector(this.parentClass).append(menuElem);
        }

    }

    const getData = async (url) => {
        const resp = await fetch(url);

        if ( !resp.ok) {
            throw new Error(`Error ${url}, ${resp.status}`);
        }
        return await resp.json();
    };

    getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCreator(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal),
/* harmony export */   "hideModal": () => (/* binding */ hideModal)
/* harmony export */ });
let modalTimer = setTimeout(showModal, 30000);
const modalBlock = document.querySelector('.modal');

function showModal() {
    modalBlock.classList.add('show');
    modalBlock.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimer);
}

function hideModal() {
    modalBlock.classList.add('hide');
    modalBlock.classList.remove('show');
    document.body.style.overflow = '';
}

function modal() {
    
    const btns = document.querySelectorAll('.call-me'),
          modalClose = document.querySelector('.modal__close');

    btns.forEach(btn => {
        btn.addEventListener('click', showModal);
    });

    window.addEventListener('click', (event) => {
        
        if(event.target === modal || event.target === modalClose) {
            hideModal();
        }
    });

    window.addEventListener('keydown', (event) => {
        if(event.key === 'Escape') {
            hideModal();
        }
    });


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

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
function tabs() {

    const tabs = document.querySelectorAll('.tabheader__item'),
    tabHeader = document.querySelector('.tabheader__items'),
    tabContent = document.querySelectorAll('.tabcontent'),
    thunder = document.querySelectorAll('.tabheader__item');

    function hideTabs() {
        tabContent.forEach(elem => {
            elem.classList.add('hide');
            elem.classList.remove('show');
        });
    }

    function showTab(i = 0,) {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show');
    }

    hideTabs();
    showTab();

    tabHeader.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;
        console.log(event.target);

        tabs.forEach((elem, i) => {
            if(elem == target) {
                hideTabs();
                showTab(i, event);
            }
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timerFunc() {
      //Timer

      const days = document.querySelector('#days'),
      hours = document.querySelector('#hours'),
      minutes = document.querySelector('#minutes'),
      seconds = document.querySelector('#seconds');

    let updater = setInterval(timer, 1000);

    timer();

    function timer() {

        let time = Date.parse('2021-12-25') - Date.parse(new Date());

        if (time <= 0) {
            clearInterval(updater);
        } else {
            days.textContent = toZero(Math.floor((time / (1000 * 60 * 60 * 24)) % 30));
            hours.textContent = toZero(Math.floor((time / (1000 * 60 * 60)) % 24));
            minutes.textContent = toZero(Math.floor((time / (1000 * 60)) % 60));
            seconds.textContent = toZero(Math.floor((time / 1000) % 60));
        }

        function toZero(num) {

            if ( num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timerFunc);

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
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");










document.addEventListener('DOMContentLoaded', () => {

  (0,_modules_menu__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();

});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map