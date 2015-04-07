var playerFlip = function() {
  if (params.canFlip && params.playerTurn) {
    flip($(this), function(match) {
      if (!match) {
        params.playerTurn = false;
        setTimeout(aiFlip, 500);
      }
    });
  }
};

var aiFlip = function() {
  console.log('params: ', params.cards);
  for (var i = 0; i < 1; i++) {
    var random = Math.floor(Math.random() * params.cards.length);
    var id = params.cards[random].id;
    if (id === params.current.id) {
      i--;
    }
  }
  var $img = $('img[data-id="' + id + '"]');
  if (params.current.rank === 0) {
    flip($img);
    setTimeout(aiFlip, 500);
  }
  flip($img, function(match) {
    if (match) {
      setTimeout(aiFlip, 500);
    } else {
      params.playerTurn = true;
    }
  });
};
