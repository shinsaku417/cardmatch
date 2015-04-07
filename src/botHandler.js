// handles click events for vs computer mode

// gets called when user flips a card
// we flip a card and if a 2nd flip doesn't match, ai will start flipping
var vsBotFlip = function() {
  if (params.canFlip && params.playerTurn) {
    flip($(this), function(match) {
      if (!match) {
        params.playerTurn = false;
        setTimeout(aiFlip, 500);
      }
    });
  }
};

// ai will search ids from it's memory or generate one
var aiFlip = function() {
  if (!params.playerTurn) {
    // for first flip, it would flip and move onto the 2nd flip in 500ms
    if (params.current.rank === 0) {
      var id = searchFromMemory(true);
      var $img = $('img[data-id="' + id + '"]');
      flip($img);
      setTimeout(aiFlip, 500);
    } else {
      // for second flip, if there is a match, continue the flipping
      // if there is no match, player will move
      var id = searchFromMemory(false);
      var $img = $('img[data-id="' + id + '"]');
      flip($img, function(match) {
        if (match) {
          setTimeout(aiFlip, 500);
        } else {
          params.playerTurn = true;
        }
      });
    }
  }
};
