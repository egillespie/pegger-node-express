var Game = require('./game.js');
var Position = require('./position.js');
var GameRepository = require('./gamerepository.js');
var PegRepository = require('./pegrepository.js')

function validateMove(game, pegWithNewPosition, callback) {
  if (game.gameOver) {
    callback(new Error('The game is over. No additional pegs may be moved.'));
    return;
  }

  PegRepository.getById(game.gameId, pegWithNewPosition.pegId, (err, pegWithOldPosition) => {
    if (err) {
      callback(err);
      return;
    } else if (pegWithOldPosition.type !== pegWithNewPosition.type) {
      callback(new Error('The peg type cannot be changed.'));
      return;
    }

    var fromPosition = pegWithOldPosition.position;
    var toPosition = pegWithNewPosition.position;
    if (toPosition.column < 1 || toPosition.column > Game.COLUMNS) {
      callback(new Error('The peg cannot be moved to that column.'));
      return;
    } else if (toPosition.row < 1 || toPosition.row > Game.ROWS) {
      callback(new Error('The peg cannot be moved to that row.'));
      return;
    } else if (Position.equals(toPosition, fromPosition)) {
      callback(new Error('The peg must be moved.'));
      return;
    } else if (toPosition.column !== fromPosition.column && toPosition.row !== fromPosition.row) {
      callback(new Error('The peg cannot be moved diagonally.'));
      return;
    } else if (Math.abs(toPosition.column - fromPosition.column) > 2) {
      callback(new Error('That location is too far away.'));
      return;
    } else if (Math.abs(toPosition.column - fromPosition.column) == 2) {
      var foundMiddlePeg = false;
      var middleColumn = (toPosition.column + fromPosition.column) / 2;
      for (var i = 0; i < game.pegs.length; i++) {
        var peg = game.pegs[i];
        var position = peg.position;
        if (position.row === toPosition.row && position.column == middleColumn) {
          foundMiddlePeg = true;
          break;
        }
      }
      if (!foundMiddlePeg) {
        callback(new Error('The peg cannot jump an empty space.'));
        return;
      }
    }

    for (var i = 0; i < game.pegs.length; i++) {
      var peg = game.pegs[i];
      if (Position.equals(toPosition, peg.position)) {
        callback(new Error('Another peg is in that position.'));
        return;
      }
    }

    if (game.lastPegMoved) {
      var lastPegMoved = game.lastPegMoved;
      if (lastPegMoved.pegId === pegWithNewPosition.pegId && Position.equals(lastPegMoved.position, toPosition)) {
        callback(new Error('This peg cannot be returned to its previous location.'));
        return;
      }
    }
    
    callback();
  });
}

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
    GameRepository.getById(gameId, callback);
  },
  
  movePeg: (game, pegWithNewPosition, callback) => {
    var err = validateMove(game, pegWithNewPosition, (err) => {
      if (err) {
        callback(err);
      } else {
        Game.movePeg(game, pegWithNewPosition);
        GameRepository.update(game, callback);
      }
    });
  }
};
