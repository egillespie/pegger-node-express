var Game = require('./game.js');
var GameRepository = require('./gamerepository');

module.exports = {
  startGame: function(callback) {
    GameRepository.nextGameId(function(err, gameId) {
      if (err) {
        callback(err);
      } else {
        GameRepository.save(Game.start(gameId), callback);
      }
    });
  }
};
