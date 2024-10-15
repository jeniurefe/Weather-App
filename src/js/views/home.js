import React from "react";
import "../../styles/home.css";

export const Home = () => (
	<div className="container">
		<div className="current-info">

			<div className="date-container">
				<div className="time" id="time">
					12.30 <span id="am-pm">PM</span>

				</div>
				<div className="date" id="date">
					Monday, 24 june
				</div>

				<div className="others" id="current-weather-items">
					<div className="weather-item">
						<div>Humidity</div>
						<div>95.2%</div>
					</div>
					<div className="weather-item">
						<div>Pressure</div>
						<div>121</div>
					</div>
					<div className="weather-item">
						<div>Wind Speed</div>
						<div>222</div>
					</div>
				</div>
			</div>

			<div className="place-container">
				<div className="time-zone" id="time-zone">Asia/Kolkata</div>
				<div id="country" className="country">IN</div>
			</div>
		</div>

		<div className="today" id="current-temp">
				<img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" className="w-icon"></img>
				<div className="others">
				<div className="day">Monday</div>
				<div className="temp">Night - 25.6&#176; C</div>
				<div className="temp">Day - 35.6&#176; C</div>

				</div>
			</div>

		<div className="future-forecast">

			<div className="weather-forecast" id="weather-forecast">
				<div className="weather-forecast-item">
					<div className="day">Tuesday</div>
					<img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" className="w-icon"></img>
					<div className="temp">Night - 25.6&#176; C</div>
					<div className="temp">Day - 35.6&#176; C</div>
				</div>

				<div className="weather-forecast-item">
					<div className="day">Wed</div>
					<img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" className="w-icon"></img>
					<div className="temp">Night - 25.6&#176; C</div>
					<div className="temp">Day - 35.6&#176; C</div>
				</div>

				<div className="weather-forecast-item">
					<div className="day">Thur</div>
					<img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" className="w-icon"></img>
					<div className="temp">Night - 25.6&#176; C</div>
					<div className="temp">Day - 35.6&#176; C</div>
				</div>

				<div className="weather-forecast-item">
					<div className="day">Fri</div>
					<img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" className="w-icon"></img>
					<div className="temp">Night - 25.6&#176; C</div>
					<div className="temp">Day - 35.6&#176; C</div>
				</div>

				<div className="weather-forecast-item">
					<div className="day">Sat</div>
					<img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" className="w-icon"></img>
					<div className="temp">Night - 25.6&#176; C</div>
					<div className="temp">Day - 35.6&#176; C</div>
				</div>

			</div>
		</div>
	
	</div>
);
