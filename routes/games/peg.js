function Peg(pegId, type, position) {
  this.pegId = pegId;
  this.type = type;
  this.position = position;
};

Peg.neutral = function(peg) {
  return peg.type !== 'red' && peg.type !== 'green';
};

module.exports = Peg;
