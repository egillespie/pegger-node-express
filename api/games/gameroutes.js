var express = require('express');
var router = express.Router();
var GameOperator = require('./gameoperator.js');

/* Create new game. */
router.post('/', (req, res, next) => {
  GameOperator.startGame((err, game) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).location('/games/' + game.gameId).json(game);
    }
  });
});

/* Move a peg. */
router.put('/:gameId/pegs/:pegId', (req, res, next) => {
  var gameId = parseInt(req.params.gameId, 10);
  var pegId = parseInt(req.params.pegId);
  var peg = req.body;
  
  if (!pegId) {
    res.status(400).end();
    return;
  } else if (pegId !== peg.pegId) {
    res.status(409).end();
    return;
  }
  
  GameOperator.lookForGame(gameId, (err, game) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.json(game);
    }
  });
});

module.exports = router;
