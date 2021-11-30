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

export default tabs;