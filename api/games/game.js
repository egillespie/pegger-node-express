var Peg = require('./peg.js');
var Position = require('./position.js');

function Game(gameId, lastPegMoved, pegs) {
  this.gameId = gameId;
  this.lastPegMoved = lastPegMoved;
  this.pegs = pegs;
  Game.calculateGameOver(this);
};

Game.COLUMNS = 4;
Game.ROWS = 2;

Game.start = (gameId) => {
  return new Game(gameId, null, [
    new Peg(1, 'red', new Position(1, 1)),
    new Peg(2, 'red', new Position(2, 4)),
    new Peg(3, 'green', new Position(1, 4)),
    new Peg(4, 'green', new Position(2, 1)),
    new Peg(5, 'yellow', new Position(1, 2)),
    new Peg(6, 'yellow', new Position(2, 3))
  ]);
};

Game.calculateGameOver = (game) => {
  for (var i = 0; i < game.pegs.length; i++) {
    var peg = game.pegs[i];
    if (!Peg.neutral(peg)) {
      for (var j = 0; j < game.pegs.length; j++) {
        var testPeg = game.pegs[j];
        if (peg.pegId !== testPeg.pegId && peg.type === testPeg.type
              && Position.adjacent(peg.position, testPeg.position)) {
          game.gameOver = true;
          return;
        }
      }
    }
  }
  game.gameOver = false;
};

Game.getPeg = function(game, pegId) {
  for (var i = 0; i < game.pegs.length; i++) {
    var peg = game.pegs[i];
    if (peg.pegId === pegId) {
      return peg;
    }
  }
  return null;
};

Game.movePeg = (game, peg) => {
  for (var i = 0; i < game.pegs.length; i++) {
    var oldPeg = game.pegs[i];
    if (oldPeg.pegId === peg.pegId) {
      game.lastPegMoved = game.pegs[i];
      game.pegs[i] = peg;
      Game.calculateGameOver(game);
      return;
    }
  }
};

module.exports = Game;
