/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '27f5835ff59655791ee03dad8c74ef47'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Event listener to add function 
document.getElementById('generate').addEventListener('click',performAction);

function performAction (event) {
    event.preventDefault();
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getWeatherData(baseURL,zipCode,apiKey)
    .then(function(newEntry){
        postData('/add', {date:newDate, temp:newEntry.main.temp, content});
    })
    .then(function(newData){
        updateUI();
    })
    form.reset();
};

//Function to GET web API Data

const getWeatherData = async (baseURL,zipCode,apiKey) => {
    const res = await fetch(baseURL,zipCode,apiKey);
    try {
        const newEntry = await res.json();
        return newEntry;
    } catch (error) {
        console.log("error", error);
    }
};

//Function to POST data
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: "post",
        credentials: "same-origin",
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify (data),
    });
    try {
        const newData = await res.json();
        return newData;
    }
    catch(error){
        console.log(error);
    }
};

const updateUI = async() => {
    const req = await fetch(url);
    try {
        const allData = await req.json()
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temperature;
        document.getElementById('content').innerHTML = allData[0].userResponse;
    } catch(error) {
        console.log('error', error);
    };
};
