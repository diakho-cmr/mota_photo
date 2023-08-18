/**
 * @property {HTMLElement} element
 * @property {string[]} images Chemins des images de la lightbox
 * @property {string} url image actuellement affichée
 */
class Lightbox {

    static init() {

        const links = Array.from(document.querySelectorAll('.card-photo-img'));
        const gallery = links.map(link => link.getAttribute('src'));

        let cards = [];
        document.querySelectorAll('.card-photo-img').forEach(card => {
            let cardSrc = card.getAttribute('src');
            let nextSibling = card.nextElementSibling;
            while (nextSibling && !nextSibling.classList.contains('photo-info')) {
                nextSibling = nextSibling.nextElementSibling;
            }
            let photoInfos = nextSibling.children;
            let ref = null;
            let category = null;
            for (let info of photoInfos) {
                if(info.classList.contains("ref")) {
                    ref = info.textContent;
                }
                if(info.classList.contains("category")) {
                    category = info.textContent;
                }
            };
            let cardArray = [];
            cardArray['src']  = cardSrc;
            cardArray['ref'] = ref;
            cardArray['category'] = category;
            cards.push(cardArray);
        });

        let zoomIcons = document.querySelectorAll('.circle');
        zoomIcons.forEach(icon => {
            let prevSibling = icon.previousSibling;
            let nextSibling = icon.nextElementSibling;
            let photoInfos = nextSibling.children;
            let ref = null;
            let category = null;
            for (let info of photoInfos) {
                if(info.classList.contains("ref")) {
                    ref = info.textContent;
                }
                if(info.classList.contains("category")) {
                    category = info.textContent;
                }
            };
            while (prevSibling && prevSibling.nodeName !== "IMG") {
                prevSibling = prevSibling.previousSibling;
            }
            let url = prevSibling.src;
            icon.addEventListener('click', e => {
                e.preventDefault();
                let nav = false;
                if(icon.classList.contains('nav')) {
                    nav = true;
                }
                new Lightbox(url, cards, ref, category, nav);
            });

        })
        
    }

    /**
     * 
     * @param {string} url Image URL
     * @param {string[]} images Chemins des images de la lightbox
     */
    constructor (url, images, ref, category, nav) {
        this.element = this.buildDom(url, nav);
        this.images = images;
        this.ref = ref;
        this.category = category;
        this.loadImage(url);
        this.addInfo(ref, category);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.body.appendChild(this.element);
        document.addEventListener('keyup', this.onKeyUp);
    }

    /**
     * 
     * @param {string} url Image URL
     */
    loadImage(url) {
        this.url = null;
        const img = this.element.querySelector('.lightbox-img');
        img.onload = () => {
            this.url = url
        }
        img.src = url;
    }

    /**
     * 
     * @param {string} ref Image reference
     * @param {string} category Image category
     */
    addInfo(ref, category) {
        const infoRef = this.element.querySelector('.infos-ref');
        const infoCat = this.element.querySelector('.infos-cat');
        infoRef.innerHTML = ref;
        infoCat.innerHTML = category;
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    onKeyUp (e) {
        if(e.key == 'Escape') {
            this.close(e);
        } else if(e.key == 'ArrowLeft') {
            this.prev(e);
        } else if(e/key == 'ArrowRight') {
            this.next(e);
        }
    }

    /**
     * Ferme la lightbox
     * @param {MouseEvent/KeyboardEvent}
     */
    close (e) {
        e.preventDefault;
        e.preventDefault;
        this.element.classList.add('fadeOut');
        this.element.parentElement.removeChild(this.element);
        /*window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element);
        }, 500);*/
        document.removeEventListener('keyup', this.onKeyUp);
    }

    /**
     * @param {MouseEvent/KeyboardEvent}  
     */
    next(e, nav) {
        e.preventDefault;
        let i = this.images.findIndex(image => image.src == this.url);
        if(i == this.images.length - 1) {
            i = -1;
        }
        this.loadImage(this.images[i + 1].src);
        this.addInfo(this.images[i + 1].ref, this.images[i + 1].category);
    }


    /**
     * @param {MouseEvent/KeyboardEvent} e  
     */
    prev(e) {
        e.preventDefault;
        let i = this.images.findIndex(image => image.src == this.url);
        if(i == 0 ) {
            i = this.images.length;
        }
        this.loadImage(this.images[i - 1].src);
        this.addInfo(this.images[i - 1].ref, this.images[i - 1].category);
    }

    /**
     * 
     * @param {string} url Image URL
     * @return {HTMLElement}
     */
    buildDom(url, nav) {
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        if(nav == true) {
            dom.innerHTML = `<i class="lightbox-button fa-solid fa-xmark lightbox-close"></i>
            <div class="lightbox-button lightbox-next">
            <p class="button-text">Suivante</p>
            <i class="fa-solid fa-arrow-right"></i>
            </div>
            <div class="lightbox-button lightbox-prev">
            <i class="fa-solid fa-arrow-left"></i>
            <p class="button-text">Précedente</p>
            </div>
            <div class="lightbox-container">
            <div class="lightbox-img-container">
            <img class="lightbox-img" src="" alt="">
            </div>
            <div class="lightbox-infos">
            <span class="infos-ref photo-desc"></span>
            <span class="infos-cat photo-desc"></span>
            </div>
            </div>`;
        } else {
            dom.innerHTML = `<i class="lightbox-button fa-solid fa-xmark lightbox-close"></i>
            <div class="lightbox-container">
            <div class="lightbox-img-container">
            <img class="lightbox-img" src="" alt="">
            </div>
            <div class="lightbox-infos">
            <span class="infos-ref photo-desc"></span>
            <span class="infos-cat photo-desc"></span>
            </div>
            </div>`;
        }
        if (dom.querySelector('.lightbox-close')) { dom.querySelector('.lightbox-close').addEventListener('click', this.close.bind(this)); }
        if (dom.querySelector('.lightbox-next')) { dom.querySelector('.lightbox-next').addEventListener('click', this.next.bind(this)); }
        if (dom.querySelector('.lightbox-prev')) { dom.querySelector('.lightbox-prev').addEventListener('click', this.prev.bind(this)); }
        return dom;
    }
}

export { Lightbox };