const KEYWORD = 'house';
const ACCESS_KEY="";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&query=landscape&orientation=landscape`;

//const body = document.body;
//body.setAttribute("background",url);
const body = document.querySelector("body"),
locationContainer = document.querySelector(".js-location span");

function loadBackground(){
    const savedImage = localStorage.getItem("bg");
    if(savedImage === null){
        getBackground();
    }else{
        const parsedImage = JSON.parse(savedImage);
        const today = new Date();
        if(today > parsedImage.expirseOn){
            getBackground();
        }else{
            body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${parsedImage.url})`;
            locationContainer.innerHTML = `${parsedImage.name}, ${parsedImage.city}, ${parsedImage.country}`;
        }
    }
}

function saveBackground(imageUrl, city, country, name){
    const savedImage = localStorage.getItem("bg");
    if(savedImage !== null){
        localStorage.removeItem("bg");
    }
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate()+1);
    const imageObject = {
        url: imageUrl,
        expirseOn: expirationDate,
        city,
        country,
        name
    }
    localStorage.setItem("bg", JSON.stringify(imageObject));
    loadBackground();
}

function getBackground(){
    fetch(UNSPLASH_URL)
        .then(response => response.json())
        .then(json => {
            const image = json;
            if(image.urls && image.urls.full && image.location){
                const fullUrl = image.urls.full;
                const location = image.location;
                const city = location.city;
                const country = location.country;
                const name = location.name;
                saveBackground(fullUrl, city, country, name);
            } else {
              getBackground();  
            }
        });
}

function initApp(){
    loadBackground();
}

initApp();



/*
const images = ["0.jpeg", "1.jpeg", "2.jpeg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);
*/
