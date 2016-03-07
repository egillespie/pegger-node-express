var express = require('express');
var router = express.Router();
var GameOperator = require('./gameoperator.js');

/* Create new game. */
router.post('/', function(req, res, next) {
  GameOperator.startGame(function(err, game) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).location('/games/' + game.gameId).json(game);
    }
  });
});

module.exports = router;
