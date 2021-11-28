var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	var request = require('request');
	const today = new Date();
	today.setDate(today.getDate() - 1);

	var date =
		today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

	const url = `https://api.opencovid.ca/timeseries?stat=cases&loc=prov&date=${date}`;

	request(url, function (error, response, body) {
		let data = JSON.parse(body);
		if (response.statusCode === 200) {
			res.send(data.cases[8]);
		}
	});
});

const obj = {
	cases: [
		{
			cases: 356,
			cumulative_cases: 334201,
			date_report: '26-11-2021',
			province: 'Alberta',
		},
		{
			cases: 341,
			cumulative_cases: 217099,
			date_report: '26-11-2021',
			province: 'BC',
		},
		{
			cases: 145,
			cumulative_cases: 67420,
			date_report: '26-11-2021',
			province: 'Manitoba',
		},
		{
			cases: 99,
			cumulative_cases: 8087,
			date_report: '26-11-2021',
			province: 'New Brunswick',
		},
		{
			cases: 6,
			cumulative_cases: 2048,
			date_report: '26-11-2021',
			province: 'NL',
		},
		{
			cases: 28,
			cumulative_cases: 8169,
			date_report: '26-11-2021',
			province: 'Nova Scotia',
		},
		{
			cases: 0,
			cumulative_cases: 674,
			date_report: '26-11-2021',
			province: 'Nunavut',
		},
		{
			cases: 0,
			cumulative_cases: 2059,
			date_report: '26-11-2021',
			province: 'NWT',
		},
		{
			cases: 911,
			cumulative_cases: 622594,
			date_report: '26-11-2021',
			province: 'Ontario',
		},
		{
			cases: 0,
			cumulative_cases: 363,
			date_report: '26-11-2021',
			province: 'PEI',
		},
		{
			cases: 1037,
			cumulative_cases: 444585,
			date_report: '26-11-2021',
			province: 'Quebec',
		},
		{
			cases: 0,
			cumulative_cases: 13,
			date_report: '26-11-2021',
			province: 'Repatriated',
		},
		{
			cases: 108,
			cumulative_cases: 80775,
			date_report: '26-11-2021',
			province: 'Saskatchewan',
		},
		{
			cases: 6,
			cumulative_cases: 1475,
			date_report: '26-11-2021',
			province: 'Yukon',
		},
	],
};
module.exports = router;
