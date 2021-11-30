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

export default menu;