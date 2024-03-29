/**
 * MAIN MENU MOBILE
 */

const mainHeaderMobile = document.querySelector(".main-header-mobile");
const icone = document.querySelector(".burger-menu-mobile");
const burgerMenuModal = document.querySelector(".burger-menu-modal");
const menuItems = document.querySelectorAll('.burger-menu-modal-opened li');

icone.addEventListener("click", function() {
    burgerMenuModal.classList.toggle('burger-menu-modal-opened');
    icone.classList.toggle('fa-times');
    mainHeaderMobile.classList.toggle('fixed');
});

menuItems.forEach(element => {
    element.addEventListener('click', function() {
        burgerMenuModal.classList.toggle('burger-menu-modal-opened');
        icone.classList.toggle('fa-times');
        mainHeaderMobile.classList.toggle('fixed');
    });
});

linkOpenModal.addEventListener("click", function() {
    burgerMenuModal.classList.toggle('burger-menu-modal-opened');
    icone.classList.toggle('fa-times');
    mainHeaderMobile.classList.toggle('fixed');
});