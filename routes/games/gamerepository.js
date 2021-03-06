var REPO = REPO || {};

module.exports = {
  nextGameId: (callback) => {
    callback(null, REPO.length);
  },
  
  save: (game, callback) => {
    if (REPO[game.gameId]) {
      callback(new Error('Game ID ' + game.gameId + ' already exists.'));
    } else {
      REPO[game.gameId] = game;
      callback(null, game);
    }
  },
  
  getById: (gameId, callback) => {
    if (REPO[gameId]) {
      callback(null, REPO[gameId]);
    } else {
      callback(new Error('Game ID ' + gameId + ' does not exist.'));
    }
  },
  
  update: (game, callback) => {
    if (REPO[game.gameId]) {
      REPO[game.gameId] = game;
      callback(null, game);
    } else {
      callback(new Error('Game ID ' + game.gameId + ' does not exist.'));
    }
  }
};
