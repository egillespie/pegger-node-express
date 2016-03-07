
var REPO = REPO || {};

module.exports = {
  nextGameId: function(callback) {
    if (!REPO['gid']) {
      REPO['gid'] = 0;
    }
    REPO['gid']++;
    callback(null, REPO['gid']);
  },
  
  save: function(game, callback) {
    if (REPO[game.gameId]) {
      callback(new Error('Game ID ' + game.gameId + ' already exists.'));
    } else {
      REPO[game.gameId] = game;
      callback(null, game);
    }
  }
};
