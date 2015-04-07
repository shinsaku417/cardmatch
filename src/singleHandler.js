// handles single player mode
// when player can flip, clicking onto the cell will flip the card
var singlePlayerFlip = function() {
  if (params.canFlip) {
    flip($(this));
  }
};
