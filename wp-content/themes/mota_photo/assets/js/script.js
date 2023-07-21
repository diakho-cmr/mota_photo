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
    buttonDiv.setAttribute('id','button');
    var buttonMore = document.createElement('span');
    buttonMore.classList.add('button-text');
    var buttonText = document.createTextNode('Charger plus');

    responseDiv.appendChild(buttonContainer);
    buttonContainer.appendChild(buttonDiv);
    buttonDiv.appendChild(buttonMore);
    buttonMore.appendChild(buttonText);
}

function getInputsValues() {
    let inputsValues = new Object;
    inputsValues['offset'] = document.querySelector("input[name=offset]").value;
    inputsValues['numberPosts']  = document.querySelector("input[name=numberPosts]").value;
    return inputsValues;
}

function queryPosts(offset, numberPosts, filterValue) {

    let offsetValue = parseInt(offset);
    let numberPostsValue = parseInt(numberPosts);

    var homeForm = document.getElementById('home-filters');
    var homeAjaxUrl = homeForm.getAttribute("action");
    var homeAction = document.querySelector("input[name=action]").value;
    var homeNonce = document.querySelector("input[name=nonce]").value;
    var homeFormat = document.querySelector("select[name=formats]").value;
    var homeCategory = document.querySelector("select[name=categories]").value;
    var homeSort = document.querySelector("select[name=sort]").value;

    var postsData = {
        'action': homeAction,
        'nonce': homeNonce,
        'format': homeFormat,
        'category': homeCategory,
        'sort': homeSort,
        'numberPosts' : numberPosts,
        'offset' : offset,
    };

    fetch(homeAjaxUrl, { //en faire une fonction
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
        },
        body: new URLSearchParams(postsData),
    })
    .then(response => response.json())
    .then(response => {

        //error
        if(!response.success) {
            console.log('error');
            alert(response.data);
        } 

        //success
        let data = response.data; //the response of the AJAX request that contains the data of the photo posts
        let posts = data.posts;
        let total = data.publishedPosts;
        let responseDiv = document.getElementById('home-photos'); // the container that hosts photos
        
        if(filterValue) {
            responseDiv.innerHTML = "";
        }

        var div = document.createElement('div');
        div.classList.add('cards-photo-container');

        posts.forEach(post => {
            createPhotoCard(post, div);
        });

        responseDiv.appendChild(div);

        if(total > (offsetValue + numberPostsValue)) { 

            document.querySelector("input[name=offset]").value = offsetValue + numberPostsValue;
            document.querySelector("input[name=numberPosts]").value = 12;

            createButtonMore(responseDiv);
            let button = document.getElementById('button');

            let inputsValues = getInputsValues();
            button.addEventListener('click', (e) => {
                let buttonContainer = button.parentNode;
                buttonContainer.classList.add('display-none');
                queryPosts(inputsValues.offset, inputsValues.numberPosts, '');
            });
        }
        
    });
    
}

document.addEventListener("DOMContentLoaded", function() {

    let inputsValues = getInputsValues();
    queryPosts(inputsValues.offset, inputsValues.numberPosts, '');
    
    let filters = document.querySelectorAll(".filter");
    filters.forEach(filter => {
        if(filter) {
            filter.addEventListener('change', (e) => {
                
                document.querySelector("input[name=offset]").value = 0;
                document.querySelector("input[name=numberPosts]").value = 8;
                
                let inputsValues = getInputsValues();
                let filterValue = filter.value;
                queryPosts(inputsValues.offset, inputsValues.numberPosts, filterValue);

            });
        }
    });

});