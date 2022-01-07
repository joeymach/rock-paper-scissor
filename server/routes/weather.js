var express = require('express');
const request = require('request');

var router = express.Router();

/*  api url is localhost:9000/weather/
    returns current temperature in celsius in Toronto 
*/
router.get('/', function (req, res, next) {
	var request = require('request');
	request(
		`https://api.openweathermap.org/data/2.5/weather?id=6167865&appid=04112d8a69c9d35a5123196f34c1cd34&units=metric`,
		function (error, response, body) {
			let data = JSON.parse(body);
			if (response.statusCode === 200) {
				res.send(`${data.main.temp}`);
			}
		}
	);
});

/*  api url is localhost:9000/weather/feels
    returns what temperature in celsius feels like in Toronto 
*/
router.get('/feels', function (req, res, next) {
	var request = require('request');
	request(
		`https://api.openweathermap.org/data/2.5/weather?id=6167865&appid=04112d8a69c9d35a5123196f34c1cd34&units=metric`,
		function (error, response, body) {
			let data = JSON.parse(body);
			if (response.statusCode === 200) {
				res.send(`${data.main.feels_like}`);
			}
		}
	);
});

/*  api url is localhost:9000/weather/feels
    returns the description of the weather in Toronto (ex: overcast clouds)
*/
router.get('/desc', function (req, res, next) {
	var request = require('request');
	request(
		`https://api.openweathermap.org/data/2.5/weather?id=6167865&appid=04112d8a69c9d35a5123196f34c1cd34&units=metric`,
		function (error, response, body) {
			let data = JSON.parse(body);
			if (response.statusCode === 200) {
				res.send(`${data.weather[0].description}`);
			}
		}
	);
});

module.exports = router;
