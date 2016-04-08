var express = require('express');
var router = express.Router();

/* GET board partial. */
router.get('/board.html', function(req, res, next) {
  res.render('partials/board');
});

/* GET home partial. */
router.get('/home.html', function(req, res, next) {
  res.render('partials/home');
});

module.exports = router;
