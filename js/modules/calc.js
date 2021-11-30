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

export default calcFunc;