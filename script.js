// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');
  const weekDays= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


// Show Time
function showTime() {
  
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    dayWeek = weekDays[today.getDay()];
    dayMonth = today.getDate();
    month = months[today.getMonth()];

 
  

  // Output Time
  time.innerHTML = `
  <div class="clock">
  <div>${addZero(hour)}<span>:</span></div>
  <div>${addZero(min)}<span>:</span></div>
  <div>${addZero(sec)}</div>
  </div>
  <div>${dayWeek}<span>,&nbsp</span>${dayMonth}<span>&nbsp</span>${month}</div>`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
// функции создания массива фонов
function getRandomImg() {
  let imgNum = Math.floor(Math.random() * 20) + 1;
  return (imgNum =
    imgNum >= 10 ? (imgNum = `${imgNum}.jpg`) : (imgNum = `0${imgNum}.jpg`));
}

let imgData = [];
async function createImgData() {
  const base = "assets/images/";
  //let imageSrc = '';
  for (let i = 0; i < 24; i++) {
    if (i < 6) imgData[i] = base + "night/" + getRandomImg();
    else if (i < 12) imgData[i] = base + "morning/" + getRandomImg();
    else if (i < 18) imgData[i] = base + "day/" + getRandomImg();
    else imgData[i] = base + "evening/" + getRandomImg();
  }
}
createImgData();

function setBgImage() {
  let today = new Date(),
    hour = today.getHours();
  let src = imgData[hour];
  const img = document.createElement("img");
  img.src = src;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${src})`;
  };
}

//Смена при нажатии btn
const btnNext = document.querySelector(".btnNext");
const btnPrev = document.querySelector(".btnPrev");
let index = new Date();
let numOfImg = index.getHours();

btnNext.onclick = function () {
  if (numOfImg < imgData.length - 1) {
    let src = imgData[numOfImg + 1];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
    };
    numOfImg++;
  } else {
    numOfImg = -1;
    let src = imgData[numOfImg + 1];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
    };
  }
};
btnPrev.onclick = function () {
  if (numOfImg > 0) {
    let src = imgData[numOfImg - 1];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
    };
    numOfImg--;
  } else {
    numOfImg = 24;
    let src = imgData[numOfImg - 1];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
    };
    numOfImg--;
  }
};


function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
    //night
    if (hour < 6) {
      greeting.textContent = "Good Night, ";
    } else if (hour < 12) {
    // Morning
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    greeting.textContent = 'Good Day, ';
  } else {
    // Evening
    greeting.textContent = 'Good Evening, ';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

let nameStorage = "";

function hiddenName(e) {
  localStorage.setItem("name", e.target.innerText);
  nameStorage = localStorage.getItem("name");
  if (e.type === "click") {
    name.textContent = "";
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
  if (localStorage.getItem("name") === "") {
    localStorage.setItem("name", e.target.innerText);
    name.textContent = nameStorage;
    localStorage.removeItem("name");
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

let focusStorage = "";

function hiddenFocus(e) {
  localStorage.setItem("focus", e.target.innerText);
  focusStorage = localStorage.getItem("focus");
  if (e.type === "click") {
    focus.textContent = "";
  }
}


// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
  if (localStorage.getItem("focus") === "") {
    localStorage.setItem("focus", e.target.innerText);
    focus.textContent = focusStorage;
    localStorage.removeItem("focus");
  }
}


//Цитаты
const blockquote = document.querySelector("blockquote");
const btn = document.querySelector(".btn");

btn.onclick = function () {
  let start = Date.now();

  let timer = setInterval(function () {
    let timePassed = Date.now() - start;

    btn.style.transform = `rotate(${timePassed}deg)`;

    if (timePassed > 180) clearInterval(timer);
  }, 20);
};

async function getQuote() {
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.quote.quoteText.length > 200) {
    getQuote();
  } else {
    blockquote.textContent = data.quote.quoteText;
  }
}

//Погода
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-discription");
const city = document.querySelector(".city");
const windSpeed = document.querySelector(".windSpeed");
const humidity = document.querySelector(".humidity");

function getCity() {
  if (
    localStorage.getItem("city") === null ||
    localStorage.getItem("city") == "[Enter your location]"
  ) {
    city.textContent = "[Enter your location]";
  } else {
    city.textContent = localStorage.getItem("city");
    getWeather();
  }
}

let cityStorage = "";

function hiddenCity(e) {
  localStorage.setItem("city", e.target.innerText);
  cityStorage = localStorage.getItem("city");
  if (e.type === "click") {
    city.textContent = "";
  }
}

// Set City
function setCity(e) {
  if (e.code === "Enter") {
    localStorage.setItem("city", e.target.innerText);
    city.blur();
    getWeather();
  }
}

city.onblur = function () {
  localStorage.setItem("city", city.textContent);
  getWeather();
};

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=87c9304055852f054a2af81cd94423f9&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (city.textContent == "") {
    localStorage.setItem("city", cityStorage);
    city.textContent = localStorage.getItem("city");
  } else if (data.cod != 200) {
    alert("Please enter your location correct");
    city.textContent = "[Enter your location]";
    weatherIcon.className = "weather-icon owf";
    temperature.textContent = ``;
    weatherDescription.textContent = "";
    humidity.textContent = ``;
    windSpeed.textContent = ``;
  } else {
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.trunc(data.main.temp)}°C`;
    city.textContent = data.name;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind speed: ${data.wind.speed} m/s`;
  }
}

document.addEventListener("DOMContentLoaded", getQuote);
btn.addEventListener("click", getQuote);

city.addEventListener("click", hiddenCity);
city.addEventListener("keypress", setCity);
city.addEventListener("blur", setCity);
name.addEventListener("click", hiddenName);
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
focus.addEventListener("click", hiddenFocus);




// Run

setBgImage();
setBgGreet();
showTime();
getName();
getFocus();

getCity();