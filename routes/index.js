var express = require('express');
var router = express.Router();
var jobs = require('../data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { jobs: jobs });
});

module.exports = router;
