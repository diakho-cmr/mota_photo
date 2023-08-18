/**
 * HOME FILTERS
 */
import { Lightbox } from "./lightbox.js";
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
    img.classList.add('card-photo-img', 'page');
    var iconEye = document.createElement('i');
    iconEye.classList.add('photo-icon', 'fa-regular', 'fa-eye', 'fa-lg');
    var iconCircleDiv = document.createElement('div');
    iconCircleDiv.classList.add('photo-icon', 'circle', 'nav');
    var iconCircle = document.createElement('i');
    iconCircle.classList.add('photo-icon', 'fa-solid', 'fa-expand', 'fa-lg');
    var infoDiv = document.createElement('div');
    infoDiv.classList.add('photo-info');
    var ref = document.createElement('span');
    ref.classList.add('photo-desc', 'ref');
    var refTexte = document.createTextNode(post.ref);
    var category = document.createElement('span');
    category.classList.add('photo-desc','category');
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

/**
 * This function retrieves the values of the inputs offset and number posts in homepage form
 */
function getInputsValues() {
    let inputsValues = new Object;
    if(document.querySelector("input[name=offset]")) {
        inputsValues['offset'] = document.querySelector("input[name=offset]").value;
    }
    if(document.querySelector("input[name=numberPosts]")) {
        inputsValues['numberPosts']  = document.querySelector("input[name=numberPosts]").value;
    }
    return inputsValues;
}

/**
 * This function launches AJAX requests necessary to display photos in homepage
 * @param {int} offset 
 * @param {int} numberPosts
 * @param {string} filterValue
 * 
 */
function queryPosts(offset, numberPosts, filterValue) {

    let offsetValue = parseInt(offset);
    let numberPostsValue = parseInt(numberPosts);
    var postsData = null;
    var homeForm = document.getElementById('home-filters');
    if(homeForm) {
        var homeAjaxUrl = homeForm.getAttribute("action");
        if(document.querySelector("input[name=action]")) {
            var homeAction = document.querySelector("input[name=action]").value;
        }
        if(document.querySelector("input[name=nonce]")) {
        var homeNonce = document.querySelector("input[name=nonce]").value; 
        }
        if(document.querySelector("select[name=formats]")) {
            var homeFormat = document.querySelector("select[name=formats]").value;
        }
        if(document.querySelector("select[name=categories]")) {
            var homeCategory = document.querySelector("select[name=categories]").value;
        }
        if(document.querySelector("select[name=sort]")) {
            var homeSort = document.querySelector("select[name=sort]").value;
        }   
        postsData = {
            'action': homeAction,
            'nonce': homeNonce,
            'format': homeFormat,
            'category': homeCategory,
            'sort': homeSort,
            'numberPosts' : numberPosts,
            'offset' : offset,
        };
    }

    if(postsData) {
        fetch(homeAjaxUrl, { 
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
            
            if(filterValue) { //reset only if change on filter
                responseDiv.innerHTML = "";
            }

            var div = document.createElement('div');
            div.classList.add('cards-photo-container');

            posts.forEach(post => {
                createPhotoCard(post, div);
            });

            responseDiv.appendChild(div);

            if(total > (offsetValue + numberPostsValue)) { //check the quantity to display the button or not

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
            //Lightbox in homepage
            Lightbox.init();
            
        });
    }
    
}

/**
 * Make the first display in homepage (initial query)
 * Detect change on homepage filters
 */
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