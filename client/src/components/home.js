import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { round, setRound } from './rounds';

import temp from './icons/temperature.png';

import trackerimg from './icons/covid19.png';
import '../widget.css';

const Home = () => {
	const [playLink, setPlayLink] = useState('playComputer');
	const [redirect, setRedirect] = useState(false);

	const [apiTitle, setApiTitle] = useState(null);
	const [apiWeather, setApiWeather] = useState({
		temp: '',
		feels: '',
		desc: '',
	});

	const [covid, setCovid] = useState({
		cases: '',
		totalCases: '',
	});

	useEffect(() => {
		fetch('http://localhost:9000/title')
			.then((res) => res.text())
			.then((res) => setApiTitle(res));

		fetch('http://localhost:9000/weather')
			.then((res) => res.text())
			.then((res) =>
				setApiWeather((prev) => {
					return {
						...prev,
						temp: res,
					};
				})
			);
		fetch('http://localhost:9000/weather/feels')
			.then((res) => res.text())
			.then((res) =>
				setApiWeather((prev) => {
					return {
						...prev,
						feels: res,
					};
				})
			);

		fetch('http://localhost:9000/weather/desc')
			.then((res) => res.text())
			.then((res) =>
				setApiWeather((prev) => {
					return {
						...prev,
						desc: res,
					};
				})
			);

		fetch('http://localhost:9000/covid')
			.then((res) => res.json())
			.then((data) =>
				setCovid({
					cases: data.cases,
					totalCases: data.cumulative_cases,
				})
			);
	}, []);

	const onSubmit = (event) => {
		event.preventDefault();

		setRedirect(true);
		const inputRounds = document.querySelector('#rounds').value;
		setRound(inputRounds);

		const redirectLink = document.querySelector('#link').value;
		setPlayLink(redirectLink);
	};



	return (
		<>
		<audio autoplay>
				<source src='./icons/music1.mp3' type='audio/mpeg' />
				
			</audio>
			<div className="widget widget-right">
				<div className="left-panel panel">
					<div className="city">TORONTO, CA</div>
					<div className="temp">{apiWeather.temp}&deg;</div>
					<div className="feels">feels like {apiWeather.feels}&deg;</div>
					<div className="feels">{apiWeather.desc}</div>
				</div>
				<div className="right-panel panel">
					<img className="widget-img" src={temp} alt="temp" />
				</div>
			</div>
			<div className="widget widget-left">
				<div className="left-panel panel">
					<div className="city">ONTARIO</div>
					<div className="cases">
						<span className="span-cases">NEW COVID19 CASES</span> <br />
						{covid.cases}
					</div>
					<div className="cases">
						<span className="span-cases">TOTAL COVID19 CASES</span> <br />
						{covid.totalCases}
					</div>
				</div>
				<div className="right-panel panel">
					<img className="widget-img2" src={trackerimg} alt="temp" />
				</div>
			</div>

			

			<div className="div-homepage-entire">
				<h2 id="welcome">Welcome. Let's play...</h2>
				<h1 id="title">{apiTitle}</h1>
				<form id="play-options" onSubmit={onSubmit}>
					<p id="r">
						Let's start by choosing the number of rounds you'd like to play today,
						and the mode you'd like to play.
					</p>
					<div class="dropdown">
						<select class="dropdown-select" id="rounds" name="rounds">
							<option class="val">Choose Your Rounds</option>
							<option class="val" value="1">
								1
							</option>
							<option class="val" value="3">
								3
							</option>
							<option class="val" value="5">
								5
							</option>
						</select>
					</div>

					<select id="link" name="link">
						<option class="mode">Choose Your Game Mode</option>
						<option value="playComputer">Player vs. Computer</option>
						<option value="playerVsPlayer">Player vs. Opponent</option>
					</select>
					<input id="playnow" type="submit" value="Bring It On! 😈" />
				</form>

				{redirect ? <Navigate to={playLink} /> : null}

			</div>
		</>
	);
};

export default Home;
