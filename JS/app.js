const wrapper = document.querySelector(".wrapper"),
    inputPart = wrapper.querySelector(".inputs"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"); 

// Getting input from the user
inputField.addEventListener("keyup", e => {
    // If user pressed the enter button and the input value is not empty
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);   
    }
});

// Getting Openweathermap API Key From the config.js file
var API_KEY = config.KEY; 

// Function to request API service
function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={apiKey}`;
}