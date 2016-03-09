var express = require('express');
var router = express.Router();
var GameOperator = require('./gameoperator.js');

/* Create new game. */
router.post('/', (req, res, next) => {
  GameOperator.startGame((err, game) => {
    if (err) {
      res.status(500).json({message: err.message});
    } else {
      res.status(201).location('/games/' + game.gameId).json(game);
    }
  });
});

/* Get a game. */
router.get('/:gameId', (req, res, next) => {
  var gameId = parseInt(req.params.gameId, 10);
  GameOperator.lookForGame(gameId, (err, game) => {
    if (err) {
      res.status(404).json({message: err.message});
    } else {
      res.json(game);
    }
  });
});

/* Move a peg. */
router.put('/:gameId/pegs/:pegId', (req, res, next) => {
  var gameId = parseInt(req.params.gameId, 10);
  var pegId = parseInt(req.params.pegId, 10);
  var peg = req.body;
  
  if (!pegId) {
    res.status(400).end();
  } else if (pegId !== peg.pegId) {
    res.status(409).end();
  } else {
    GameOperator.lookForGame(gameId, (err, game) => {
      if (err) {
        res.status(404).json({message: err.message});
      } else {
        GameOperator.movePeg(game, peg, (err, game) => {
          if (err) {
            res.status(422).json({message: err.message});
          } else {
            res.status(303).location('/games/' + game.gameId).end();
          }
        });
      }
    });
  }
});

module.exports = router;
