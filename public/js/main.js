const cityname = document.getElementById('cityname');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp_real_val = document.getElementById('temp_real_val');
const datahide = document.querySelector('.middle_layer');

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityname.value;

    if (cityVal == "") {
        city_name.innerText = 'Please write city name before search.';
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=a6a8e177599c2402b5501dc2836a3123`;
            const response = await fetch(url);
            const data = await response.json();
            const arrdata = [data];
            city_name.innerText = `${arrdata[0].name},${arrdata[0].sys.country}`;
            temp_real_val.innerText = (arrdata[0].main.temp - 273).toFixed(2);
            const tempMood = arrdata[0].weather[0].main;

            if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#0b5fdd'></i>";
            }
            else if (tempMood == "Sunny") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#e5c507'></i>";
            }
            else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color:#0b5fdd'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#fff'></i>";
            }
            datahide.classList.remove('data_hide');
        } catch {
            city_name.innerText = 'Please enter valid city name.';
            datahide.classList.add('data_hide');
        }
    }

};

submitBtn.addEventListener('click', getInfo);