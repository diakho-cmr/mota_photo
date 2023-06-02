/**
 * CONTACT MODAL
 */

var contactModal = document.querySelector(".contact-modal");
var contactForm = document.querySelector(".contact-form");

if(window.innerWidth <= 600) {
    var linkOpenModal = document.querySelector(".main-header-mobile .burger-menu-modal .menu-contact-link");
} else {
    var linkOpenModal = document.querySelector(".main-header-desktop .main-header-nav .menu-contact-link");
    console.log(linkOpenModal);
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
