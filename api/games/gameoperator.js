var Game = require('./game.js');
var GameRepository = require('./gamerepository');

module.exports = {
  startGame: (callback) => {
    GameRepository.nextGameId((err, gameId) => {
      if (err) {
        callback(err);
      } else {
        GameRepository.save(Game.start(gameId), callback);
      }
    });
  },
  
  lookForGame: (gameId, callback) => {
    GameRepository.getById(gameId, (err, game) => callback(err, game));
  }
};
