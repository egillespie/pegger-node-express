var express = require('express');
var router = express.Router();

/* Create new game. */
router.post('/', function(req, res, next) {
  var game = {
    gameId: 1234
  };
  res.status(201).location('/games/' + game.gameId).json(game);
});

module.exports = router;
