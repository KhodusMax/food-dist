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

export default timerFunc;