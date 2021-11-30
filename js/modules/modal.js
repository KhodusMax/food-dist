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

export default modal;
export {showModal};
export {hideModal};