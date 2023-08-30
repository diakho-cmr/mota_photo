import { Lightbox } from "./lightbox.js";

//Lightbox in single-post page
if(document.querySelector('.post-photo-container')) {
    if(window.innerWidth > 768) {
        Lightbox.init();
    }
}