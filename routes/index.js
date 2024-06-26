var express = require('express');
var path = require('path');
var router = express.Router();
var moment = require('moment');
var { publishToMQTT } = require('../public/javascripts/proj');

var currentData = {
  speed: 'N/A',
  direction: 'N/A',
  prevDirection: 'N/A'
};

/* Middleware to add request time */
var requestTime = function (req, res, next) {
  req.requestTime = moment().format('HH:mm:ss - DD/MM/YYYY');
  next();
};

router.use(requestTime);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'VIBARYJE',
    connectionTime: req.requestTime,
    speed: currentData.speed,
    direction: currentData.direction
  });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  console.log('POST Data:', req.body);
  console.log('Time:', req.requestTime);

  // Atualiza os dados recebidos
  if (req.body.speed) {
    currentData.speed = req.body.speed;
  }
  if (req.body.direction) {
    currentData.direction = req.body.direction;
    if(currentData.direction != currentdData.prevDirection){
      publishToMQTT('jesse', req.body.direction);
      currentData.prevDirection = currentData.direction; 
    }
  }else{
    publishToMQTT('jesse', req.body.direction);
  }
    
    
  // if (req.body.direction) {
  //   currentData.direction = req.body.direction;
  //   publishToMQTT('jesse', req.body.direction);
  // }

  res.render('index', {
    title: 'VIBARYJE',
    connectionTime: req.requestTime,
    speed: currentData.speed,
    direction: currentData.direction
  });
});

// Serve client.js
router.get('/javascripts/script.js', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/javascripts/script.js'));
});

module.exports = router;
