'use strict';

import menu from './modules/menu';
import tabs from './modules/tabs';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import calc from './modules/calc';

document.addEventListener('DOMContentLoaded', () => {

  menu();
  tabs();
  forms();
  modal();
  slider();
  timer();
  calc();

});

