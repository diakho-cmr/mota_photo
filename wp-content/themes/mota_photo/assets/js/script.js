/**
 * CONTACT MODAL
 */

var contactModal = document.querySelector(".contact-modal");
var contactForm = document.querySelector(".contact-form");

// get link contact on desktop VS on mobile
if(window.innerWidth <= 600) {
    var linkOpenModal = document.querySelector(".main-header-mobile .burger-menu-modal .menu-contact-link");
} else {
    var linkOpenModal = document.querySelector(".main-header-desktop .main-header-nav .menu-contact-link");
}

linkOpenModal.addEventListener("click", function() {
    contactModal.classList.toggle('contact-modal-displayed');
});

window.addEventListener("click", function(event) {
    if (event.target == contactModal) {
        contactModal.classList.toggle('contact-modal-displayed');
    }
});

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    contactModal.classList.toggle('contact-modal-displayed');
});

/**
 * MAIN MENU MOBILE
 */

var mainHeaderMobile = document.querySelector(".main-header-mobile");
var icone = document.querySelector(".burger-menu-mobile");
var burgerMenuModal = document.querySelector(".burger-menu-modal");
var menuItems = document.querySelectorAll('.burger-menu-modal-opened li');

icone.addEventListener("click", function() {
    burgerMenuModal.classList.toggle('burger-menu-modal-opened');
    icone.classList.toggle('fa-times');
});

menuItems.forEach(element => {
    element.addEventListener('click', function() {
        burgerMenuModal.classList.toggle('burger-menu-modal-opened');
        icone.classList.toggle('fa-times');
    });
});

linkOpenModal.addEventListener("click", function() {
    burgerMenuModal.classList.toggle('burger-menu-modal-opened');
    icone.classList.toggle('fa-times');
});

/**
 * POSTS NAVIGATION
 */

var arrowPrev = document.querySelector(".arrow-prev");
var arrowNext = document.querySelector(".arrow-left");
var imgPrev = document.querySelector('.img-post-prev');
var imgNext = document.querySelector('.img-post-next');


arrowPrev.addEventListener('mouseover', function() {
    imgPrev.classList.remove('img-post');
    imgPrev.classList.add('img-post-hover');
});
arrowPrev.addEventListener('mouseout', function() {
    imgPrev.classList.add('img-post');
    imgPrev.classList.remove('img-post-hover');
});

arrowNext.addEventListener('mouseover', function() {
    imgNext.classList.remove('img-post');
    imgNext.classList.add('img-post-hover');
});
arrowNext.addEventListener('mouseout', function() {
    imgNext.classList.add('img-post');
    imgNext.classList.remove('img-post-hover');
});

/**
 * RELATED POSTS
 */

var relatedPosts = document.querySelectorAll(".related-post");
var photoIcons = document.querySelectorAll(".photo-icon");

relatedPosts.forEach(post => {
    post.addEventListener('mouseover', function() {
        photoIcons.forEach(icon => {
            icon.classList.add('photo-hover-icon');
            if(icon.classList.contains('fa-eye')) {
                icon.classList.add('icon-eye');
            }
            if(icon.classList.contains('fa-expand')) {
                icon.classList.add('icon-focus');
            }
            if(icon.classList.contains('circle')) {
                icon.classList.add('icon-circle');
            }
        });
    });
    post.addEventListener('mouseout', function() {
        photoIcons.forEach(icon => {
            icon.classList.remove('photo-hover-icon');
            if(icon.classList.contains('fa-eye')) {
                icon.classList.remove('icon-eye');
            }
            if(icon.classList.contains('fa-expand')) {
                icon.classList.remove('icon-focus');
            }
            if(icon.classList.contains('circle')) {
                icon.classList.remove('icon-circle');
            }
        });
    });
});


