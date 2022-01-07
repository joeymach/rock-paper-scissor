var express = require('express');
var router = express.Router();

// api url is localhost:9000/title which returns the title of the game
router.get('/', function(req, res, next) {
  res.send('Rock, Paper, and Scissors!');
});

module.exports = router;
