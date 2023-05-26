// Getting Openweathermap API Key From the config.js file
var API_KEY = config.KEY; 

const wrapper = document.querySelector(".wrapper"),
    inputPart = wrapper.querySelector(".inputs"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button"),
    wIcon = document.querySelector(".weather-part img"),
    leftArrow = wrapper.querySelector("header i"); 

let api; 

// Getting input from the user
inputField.addEventListener("keyup", e => {
    // If user pressed the enter button and the input value is not empty
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);   
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) { // If browser support geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError); 
    } else {
        alert("Your browser not support geolation api"); 
    }
}); 

function onSuccess(position) {

    const { latitude, longitude } = position.coords; // Getting Lat and Long of the user device from Coords object
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`

    fetchData(); 
    // console.log(position);
}

function onError(error) {
    infoTxt.innerText = error.message; 
    infoTxt.classList.add("error"); 
}


// Function to request API service
function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    
    fetchData(); 
}

function fetchData() {

    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");

    // Getting API Response and returning it with parsing into javascript object and in another.
    // then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    infoTxt.classList.replace("pending", "error"); 

    if (info.cod == "404") {
        infoTxt.innerText = `${inputField.value} isn't a valid city name`; 
    } else {
        // Let's get required properties value from the info Object

        const city = info.name; 
        const country = info.sys.country; 
        const { description, id } = info.weather[0]; 
        const { feels_like, humidity, temp } = info.main;

        // Using custom icon according to the id which api return us
        if (id == 800) {
            wIcon.src = "assets/icons/clear.svg"; 
        }
        else if (id >= 200 && id <= 232) {
            wIcon.src = "assets/icons/strom.svg"; 
        }
        else if (id >= 600 && id <= 622) {
            wIcon.src = "assets/icons/snow.svg"; 
        }
        else if (id >= 701 && id <= 781) {
            wIcon.src = "assets/icons/haze.svg";
        }
        else if (id >= 801 && id <= 804) {
            wIcon.src = "assets/icons/cloud.svg"; 
        }
        else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            wIcon.src = "assets/icons/rain.svg"; 
        }
        
        // Pass these values to a particular html element. 
        wrapper.querySelector(".temp .number").innerText = Math.floor(temp); 
        wrapper.querySelector(".weather").innerText = description; 
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`; 
        wrapper.querySelector(".temp .number-2").innerText = Math.floor(feels_like); 
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`; 


        infoTxt.classList.remove("pending", "error"); 
        wrapper.classList.add("active"); 
        console.log(info);
    }

    console.log(info);
}


leftArrow.addEventListener("click", () => {
    wrapper.classList.remove ("active");  
});