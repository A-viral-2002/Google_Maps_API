const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    
    if(cityVal === "") {
        city_name.innerText = `Please Write Name Here`;
    }
    else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=dc1b45fc6e9808deb0c01ce55c29e70a`
            const Response = await fetch(url);
            const data = await Response.json();
            const arrData = [data];

            cityName.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp;
            temp_status.innerText = arrData[0].weather[0].main;

            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood);

            if (tempMood == "Clear") {
                temp_status.innerHTML = "<i class = 'fa-solid fa-sun' style = 'color: yellow;'> </i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class = 'fa fa-cloud' style = 'color: blue;'> </i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class = 'fa-solid fa-cloud-rain' style = 'color: green;'> </i>";
            } else {
                temp_status.innerHTML = "<i class = 'fa-solid fa-cloud-rain' style = 'color: orange;'> </i>";
            }
        }catch {
            city_name.innerText = `Please Enter City Name Properly`;
        }
    }
}

submitBtn.addEventListener('click', getInfo);