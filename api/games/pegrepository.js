var Game = require('./game.js');
var GameRepository = require('./gamerepository.js');

module.exports = {
  getById: (gameId, pegId, callback) => {
    GameRepository.getById(gameId, (err, game) => {
      if (err) {
        callback(err);
      } else {
        var peg = Game.getPeg(game, pegId);
        if (peg) {
          callback(null, peg);
        } else {
          callback(new Error('Peg ID ' + pegId + ' does not exist.'));
        }
      }
    });
  }
};
