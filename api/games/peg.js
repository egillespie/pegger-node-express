function Peg(pegId, type, position) {
  this.pegId = pegId;
  this.type = type;
  this.position = position;
};

Peg.prototype.neutral = function() {
  return this.type !== 'red' && this.type !== 'green';
}

module.exports = Peg;
