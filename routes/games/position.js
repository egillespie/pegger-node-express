function Position(row, column) {
  this.row = row;
  this.column = column;
}

Position.adjacent = (position1, position2) => {
  if (position1.row === position2.row) {
      return position1.column === position2.column - 1 || position1.column === position2.column + 1;
  } else if (position1.column === position2.column) {
      return position1.row === position2.row - 1 || position1.row === position2.row + 1;
  }
  return false;
};

Position.equals = function(position1, position2) {
  return position1.row === position2.row && position1.column === position2.column;
};

module.exports = Position;
