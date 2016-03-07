function Position(row, column) {
  this.row = row;
  this.column = column;
}

Position.prototype.adjacentTo = (position) => {
  if (this.row === position.row) {
      return this.column === position.column - 1 || this.column === position.column + 1;
  } else if (this.column === position.column) {
      return this.row === position.row - 1 || this.row === position.row + 1;
  }
  return false;
};

module.exports = Position;
