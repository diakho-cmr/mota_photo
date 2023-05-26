/**
 * CONTACT MODAL
 */

var contactModal = document.querySelector(".contact-modal");
var linkOpenModal = document.querySelector(".menu-contact-link");
var contactForm = document.querySelector(".contact-form");

linkOpenModal.addEventListener("click", function() {
    contactModal.style.display = "block";
});

window.addEventListener("click", function(event) {
    if (event.target == contactModal) {
      contactModal.style.display = "none";
    }
});

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    contactModal.style.display = "none";
});