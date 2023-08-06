/**
 * CONTACT MODAL
 */

let contactModal = document.querySelector(".contact-modal");
let contactForm = document.querySelector(".contact-form");

// get link contact on desktop VS on mobile
if(window.innerWidth <= 768) {
    var linkOpenModal = document.querySelector(".main-header-mobile .burger-menu-modal .menu-contact-link");
} else {
    var linkOpenModal = document.querySelector(".main-header-desktop .main-header-nav .menu-contact-link");
}
var singlePhotocontact = document.querySelector(".post-photo-contact-button");

linkOpenModal.addEventListener("click", function() {
    contactModal.classList.toggle('contact-modal-displayed');
});

if(singlePhotocontact) {
    singlePhotocontact.addEventListener("click", function() {
        contactModal.classList.toggle('contact-modal-displayed');
    });
}

window.addEventListener("click", function(event) {
    if (event.target == contactModal) {
        contactModal.classList.toggle('contact-modal-displayed');
    }
});

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    contactModal.classList.toggle('contact-modal-displayed');
});

//prefill the reference field
if(document.querySelector(".photo-ref")) {
    let refTag = document.querySelector(".photo-ref");
    let refValue = refTag.textContent;
    if(document.querySelector("input[name=ref-photo]")) {
        document.querySelector("input[name=ref-photo]").value = refValue;
    }
}