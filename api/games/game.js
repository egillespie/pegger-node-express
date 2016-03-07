var Peg = require('./peg.js');
var Position = require('./position.js');

function Game(gameId, lastPegMoved, pegs) {
  this.gameId = gameId;
  this.lastPegMoved = lastPegMoved;
  this.pegs = pegs;
};

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

module.exports = Game;
