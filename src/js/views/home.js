import React, { useEffect } from "react";
import "../../styles/home.css";

export const Home = () => {
    useEffect(() => {
        const timeEl = document.getElementById('time');
        const dateEl = document.getElementById('date');
        const currentWeatherItemEl = document.getElementById('current-weather-items');
        const timezone = document.getElementById('time-zone');
        const countryEl = document.getElementById('country');
        const weatherForecastEl = document.getElementById('weather-forecast');
        const currentTempEl = document.getElementById('current-temp');

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const API_KEY = 'MY_KEY';

        const updateTimeAndDate = () => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
            const minutes = time.getMinutes();
            const ampm = hour >= 12 ? 'PM' : 'AM';

            timeEl.innerHTML = `${hoursIn12HrFormat}:${minutes < 10 ? '0' : ''}${minutes} <span id="am-pm">${ampm}</span>`;
            dateEl.innerHTML = `${days[day]}, ${date} ${months[month]}`;
        };

        updateTimeAndDate(); // Llamar inmediatamente para mostrar la hora actual al cargar
        const intervalId = setInterval(updateTimeAndDate, 1000); // Actualizar cada segundo

        const getWeatherData = () => {
            navigator.geolocation.getCurrentPosition((success) => {
                let { latitude, longitude } = success.coords;

                fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        showWeatherData(data);
                    })
                    .catch(error => console.error('Error fetching weather data:', error));
            });
        };

        const showWeatherData = (data) => {
            if (data.current) {
                let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

                currentWeatherItemEl.innerHTML = `
                    <div className="weather-item">
                        <div>Humidity</div>
                        <div>${humidity}%</div>
                    </div>
                    <div className="weather-item">
                        <div>Pressure</div>
                        <div>${pressure} hPa</div>
                    </div>
                    <div className="weather-item">
                        <div>Wind Speed</div>
                        <div>${wind_speed} m/s</div>
                    </div>`;
            } else {
                console.error('Current weather data is undefined:', data);
            }
        };

        getWeatherData();

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="container">
            <div className="current-info">
                <div className="date-container">
                    <div className="time" id="time">12:30 <span id="am-pm">PM</span></div>
                    <div className="date" id="date">Monday, 24 June</div>
                    <div className="others" id="current-weather-items"></div>
                </div>
                <div className="place-container">
                    <div className="time-zone" id="time-zone">Asia/Kolkata</div>
                    <div id="country" className="country">IN</div>
                </div>
            </div>
            <div className="today" id="current-temp">
                <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" className="w-icon" />
                <div className="others">
                    <div className="day">Monday</div>
                    <div className="temp">Night - 25.6&#176; C</div>
                    <div className="temp">Day - 35.6&#176; C</div>
                </div>
            </div>
            <div className="future-forecast">
                <div className="weather-forecast" id="weather-forecast">
                    <div className="weather-forecast-item">
                        <div className="day">Tues</div>
                        <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" className="w-icon" />
                        <div className="temp">Night - 25.6&#176; C</div>
                        <div className="temp">Day - 35.6&#176; C</div>
                    </div>
                    <div className="weather-forecast-item">
                        <div className="day">Wed</div>
                        <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" className="w-icon" />
                        <div className="temp">Night - 25.6&#176; C</div>
                        <div className="temp">Day - 35.6&#176; C</div>
                    </div>
                    <div className="weather-forecast-item">
                        <div className="day">Thur</div>
                        <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" className="w-icon" />
                        <div className="temp">Night - 25.6&#176; C</div>
                        <div className="temp">Day - 35.6&#176; C</div>
                    </div>
                    <div className="weather-forecast-item">
                        <div className="day">Fri</div>
                        <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" className="w-icon" />
                        <div className="temp">Night - 25.6&#176; C</div>
                        <div className="temp">Day - 35.6&#176; C</div>
                    </div>
                    <div className="weather-forecast-item">
                        <div className="day">Sat</div>
                        <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" className="w-icon" />
                        <div className="temp">Night - 25.6&#176; C</div>
                        <div className="temp">Day - 35.6&#176; C</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

