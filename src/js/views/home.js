import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => (

	<div className="container">
		<div className="search-box">
			<i className="fas fa-map-marker-alt"></i>
		 	<input type="text" placeholder="enter your location"></input>
			<button className="fas fa-search"></button>
		</div>

		<div className="weather-box">
			<div className="box">
				<div className="info-weather">
					<div className="weather">
						<img src=""></img>
					</div>
				</div>

			</div>

		</div>
	</div>
);
