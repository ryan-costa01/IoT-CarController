var express = require('express');
var router = express.Router();
var moment = require('moment');

/* Middleware to add request time */
var requestTime = function (req, res, next) {
  req.requestTime = moment().format('HH:mm:ss - DD/MM/YYYY');
  next();
};

router.use(requestTime);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express Teste',
    connectionTime: req.requestTime,
    speed: 'N/A',
    direction: 'N/A'
  });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  console.log('POST Data:', req.body);
  console.log('Time:', req.requestTime);

  res.render('index', {
    title: 'Express Teste',
    connectionTime: req.requestTime,
    speed: req.body.speed || 'N/A',
    direction: req.body.direction || 'N/A'
  });
});

module.exports = router;