function Game(gameId, lastPegMoved, pegs) {
  this.gameId = gameId;
  this.lastPegMoved = lastPegMoved;
  this.pegs = pegs;
};

Game.start = function(gameId) {
  return new Game(gameId);
};

module.exports = Game;
