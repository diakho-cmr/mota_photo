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

/**
 * RELATED POSTS
 */

var relatedPosts = document.querySelectorAll(".card-photo");
var photoIcons = document.querySelectorAll(".photo-icon");

/*
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
*/

/**
 * HOME FILTERS
 */

document.addEventListener("DOMContentLoaded", function() {

    var filters = document.querySelectorAll(".filter");

    filters.forEach(filter => {
        if(filter) {
            filter.addEventListener('change', (e) => {
                //données du formulaires
            var form = document.getElementById('home-filters');
            var ajaxUrl = form.getAttribute("action");
            var action = document.querySelector("input[name=action]").value;
            var nonce = document.querySelector("input[name=nonce]").value;
            var format = document.querySelector("select[name=formats]").value;
            var category = document.querySelector("select[name=categories]").value;
            var sort = document.querySelector("select[name=sort]").value;
            
            var data = {
                'action': action,
                'nonce': nonce,
                'format': format,
                'category': category,
                'sort': sort
            };
            //console.log(data);
            //console.log(ajaxUrl);
            //var y = arr["one"];

            //requête AJAX
            fetch(ajaxUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache',
                },
                body: new URLSearchParams(data),
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);

                //en cas d'erreur
                if(!response.success) {
                    alert(response.data);
                    return;
                }
                //console.log(response.data)
                let responseDiv = document.getElementById('home-photos');
                responseDiv.innerHTML = "";
                let data = response.data;
                data.forEach(post => {
                    var cardPhoto = document.createElement("div");
                    cardPhoto.classList.add('card-photo');
                    var img = document.createElement('img');
                    img.src = post.img_url;
                    img.alt = post.img_alt;
                    cardPhoto.appendChild(img);
                    responseDiv.appendChild(cardPhoto);
                    //var nouvelElement = document.createElement("img");
                    //var texte = document.createTextNode(post.post_title);
                    //nouvelElement.appendChild(texte);
                });
                //en cas de réussite
                
            })
            });
        }
    });

    /*if(selectFormats) {
        selectFormats.addEventListener('change', (event) => {

            //données du formulaires
            var form = document.getElementById('home-filters');
            var ajaxUrl = form.getAttribute("action");
            var action = document.querySelector("input[name=action]");
            action = action.value;
            var nonce = document.querySelector("input[name=nonce]");
            nonce = nonce.value;
            var format = selectFormats.value;
            var data = {
                'action': action,
                'nonce': nonce,
                'format': format,
            };
            //console.log(data);
            //console.log(ajaxUrl);
            //var y = arr["one"];

            //requête AJAX
            fetch(ajaxUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache',
                },
                body: new URLSearchParams(data),
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);

                //en cas d'erreur
                if(!response.success) {
                    alert(response.data);
                    return;
                }
                let responseDiv = document.getElementById('response');
                responseDiv.innerHTML = "";
                let data = response.data;
                data.forEach(post => {
                    //console.log(post);
                    var nouvelElement = document.createElement("p");
                    var texte = document.createTextNode(post.post_title);
                    nouvelElement.appendChild(texte);
                    responseDiv.appendChild(nouvelElement);
                });
                //en cas de réussite
                
            })
        });
    }*/

});