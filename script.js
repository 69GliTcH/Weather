let huecolor = 0;
setInterval(() => {
    if (huecolor < 360) {
        ++huecolor;
    } else {
        huecolor = 0;
    }
    document.documentElement.style.setProperty("--hue-colour", huecolor);
}, 100);

const tempField = document.querySelector(".weather1 span");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 p img");
const weatherField = document.querySelector(".weather3 span");
const searchField=document.querySelector(".searchField");
const form=document.querySelector("form");

let target = "delhi india";
const fetchData = async (target) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=7b3bfa1f7ae740d3bfa75434232812&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();
    const {
        current: { temp_c, condition: { text, icon } },
        location: { name, localtime }
    } = data;
    updateDom(temp_c, name, icon, localtime, text);
    console.log(data);
};


function updateDom(temp, city, emoji, date, weather) {
    tempField.innerText = temp;
    cityField.innerText = city;
    emojiField.src = emoji;
    const exactTime = date.split(" ")[1];
    const exactDate = date.split(" ")[0];
    const exactDay = new Date(exactDate).getDay();
    dateField.innerText=`${exactTime}-${day(exactDay)}-${exactDate}`;
    weatherField.innerText = weather;
}

function day(num) {
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Don't Know";
    }

}

const search=(e)=>{
    e.preventDefault(); //so page does not reload
    target=searchField.value;
    fetchData(target);
    
}

form.addEventListener("submit",search)


fetchData(target);