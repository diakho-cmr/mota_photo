/**
 * POSTS NAVIGATION
 */

var arrowPrev = document.querySelector(".arrow-prev");
var arrowNext = document.querySelector(".arrow-next");
var imgPrev = document.querySelector('.img-post-prev');
var imgNext = document.querySelector('.img-post-next');


if(arrowPrev) {
    arrowPrev.addEventListener('mouseover', function() {
        imgPrev.classList.remove('img-post');
        imgPrev.classList.add('img-post-hover');
    });
    arrowPrev.addEventListener('mouseout', function() {
        imgPrev.classList.add('img-post');
        imgPrev.classList.remove('img-post-hover');
    });
}

if(arrowNext) {
    arrowNext.addEventListener('mouseover', function() {
        imgNext.classList.remove('img-post');
        imgNext.classList.add('img-post-hover');
    });
    arrowNext.addEventListener('mouseout', function() {
        imgNext.classList.add('img-post');
        imgNext.classList.remove('img-post-hover');
    });
}