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
 * HOME FILTERS
 */

/**
 * This function creates DIVs containing photo type posts in homepage
 * @param {object} post - the subject that contains the url of the image, the alt, etc.
 * @param {DIV} responseDiv - the container that hosts all the photo content type divs.
 * 
 */
function createPhotoCard(post, responseDiv) {
    //console.log(post);
    var cardPhoto = document.createElement("div");
    cardPhoto.classList.add('card-photo');
    var img = document.createElement('img');
    img.src = post.img_url;
    img.alt = post.img_alt;
    var iconEye = document.createElement('i');
    iconEye.classList.add('photo-icon', 'fa-regular', 'fa-eye', 'fa-lg');
    var iconCircleDiv = document.createElement('div');
    iconCircleDiv.classList.add('photo-icon', 'circle');
    var iconCircle = document.createElement('i');
    iconCircle.classList.add('photo-icon', 'fa-solid', 'fa-expand', 'fa-lg');
    var infoDiv = document.createElement('div');
    infoDiv.classList.add('photo-info');
    var ref = document.createElement('span');
    ref.classList.add('photo-desc');
    var refTexte = document.createTextNode(post.ref);
    var category = document.createElement('span');
    category.classList.add('photo-desc');
    var term = document.createTextNode(post.term);

    responseDiv.appendChild(cardPhoto);
    cardPhoto.appendChild(img);
    cardPhoto.appendChild(iconEye);
    cardPhoto.appendChild(iconCircleDiv);
    iconCircleDiv.appendChild(iconCircle);
    cardPhoto.appendChild(infoDiv);
    infoDiv.appendChild(ref);
    ref.appendChild(refTexte);
    infoDiv.appendChild(category);
    category.appendChild(term);
}

/**
 * This function creates the button used to load the following images.
 * @param {DIV} responseDiv - the container that hosts the button.
 * 
 */
function createButtonMore(responseDiv) {
    var buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    var buttonDiv = document.createElement('div');
    buttonDiv.classList.add('grey-button', 'load-more-button');
    var buttonMore = document.createElement('span');
    buttonMore.classList.add('button-text');
    var buttonText = document.createTextNode('Charger plus');

    responseDiv.appendChild(buttonContainer);
    buttonContainer.appendChild(buttonDiv);
    buttonDiv.appendChild(buttonMore);
    buttonMore.appendChild(buttonText);
}


/**
 * AJAX request to display photos on homepage (Filters, sorting and load more button)
 * Works wih hook wp_ajax_sort_posts_photo (see the custom function sort_posts_photo() in functions.php)
 */
document.addEventListener("DOMContentLoaded", function() {

    //Detect filter change
    var filters = document.querySelectorAll(".filter");
    filters.forEach(filter => {
        if(filter) {
            filter.addEventListener('change', (e) => {

                //get form data
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

                //AJAX Request
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

                    //error
                    if(!response.success) {
                        alert(response.data);
                        return;
                    }

                    //success
                    let responseDiv = document.getElementById('home-photos'); // the container that hosts photos
                    responseDiv.innerHTML = "";
                    let data = response.data; //the response of the AJAX request that contains the data of the photo posts

                    //Check if there are more than 8 photos to display or not the more photos button
                    if(data.length > 8) {

                        //Retrieve the first 8 posts of the initial array that contains all the posts
                        var firstArray = data.slice(0,8); 
                        var div = document.createElement('div');
                        div.classList.add('cards-photo-container');

                        //Display the first 8 photos with the button
                        firstArray.forEach(post => {
                            createPhotoCard(post, div);
                        });
                        responseDiv.appendChild(div);
                        createButtonMore(responseDiv);

                        //Divider by array of 12 the remaining posts
                        var secondArray = data.slice(8);
                        var chunkSize = 12;
                        var chunkedArrays = [];
                        for (let i = 0; i < secondArray.length; i += chunkSize) {
                            const chunk = secondArray.slice(i, i + chunkSize);
                            chunkedArrays.push(chunk);
                        }

                        //Display them with the button
                        var iteration = 0;
                        chunkedArrays.forEach(array => {
                            var div = document.createElement('div');
                            div.classList.add('display-none');
                            responseDiv.appendChild(div);
                            array.forEach(post => {
                                createPhotoCard(post, div);
                            });
                            iteration++;
                            //Do not display the button if it is the last of the only array
                            if(iteration !== chunkedArrays.length) {
                                createButtonMore(responseDiv);
                            }
                        });

                        //Display photos by 12 when the button is clicked
                        var morePhotos = document.querySelectorAll('.load-more-button');
                        morePhotos.forEach(morePhoto => {
                            morePhoto.addEventListener("click", (event) => {
                                var moreContainer = morePhoto.parentNode;
                                if (moreContainer.nextElementSibling) {
                                    moreContainer.nextElementSibling.classList.remove('display-none');
                                    moreContainer.nextElementSibling.classList.add('cards-photo-container');
                                }
                            });
                        });

                    //If the main query returns less than 12 posts
                    } else {
                        var div = document.createElement('div');
                        div.classList.add('cards-photo-container');
                        data.forEach(post => {
                            createPhotoCard(post, div);
                        });
                        responseDiv.appendChild(div);
                    }
                });
            });
        }
    });

    /**
     * Display photos by 12 when the button is clicked 
     * Only for the first request without user interaction (default query when the user arrives homepage)
     */
    var homeMoreButton = document.querySelectorAll('.load-more-button');
    console.log(homeMoreButton);
    homeMoreButton.forEach(morePhoto => {
        morePhoto.addEventListener("click", (event) => {
            console.log('cliqué');
            var moreContainer = morePhoto.parentNode;
            if (moreContainer.nextElementSibling) {
                moreContainer.nextElementSibling.classList.remove('display-none');
                moreContainer.nextElementSibling.classList.add('cards-photo-container');
            }
        });
    });

});