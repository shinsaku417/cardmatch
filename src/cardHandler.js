// function that shuffles the deck and set it to the parameter
var shuffle = function() {
  var cards = [];
  for (var i = 0; i < params.num; i++) {
    var name = i % 13 + 1;
    if (i % 4 === 0) {
      name += '-clubs';
    }
    if (i % 4 === 1) {
      name += '-diamonds';
    }
    if (i % 4 === 2) {
      name += '-hearts';
    }
    if (i % 4 === 3) {
      name += '-spades';
    }
    cards.push({
      id: null,
      name: name
    });
  }
  var shuffled = _.shuffle(cards);
  _.each(shuffled, function(card, index) {
    card.id = index;
  });
  return cards;
};

var getCardWithId = function(id) {
  var cards = params.cards;
  var index = 0;
  _.each(cards, function(card, i) {
    if (card.id === id) {
      index = i;
    }
  });
  return params.cards[index];
};

var removePair = function(first, second) {
  var cards = params.cards;
  _.each(cards, function(card, i) {
    if (card.id === first || card.id === second) {
      cards.splice(i, 1);
    }
  });
};

var flip = function($img, callback) {
  var id = $img.data('id');
  var card = getCardWithId(id).name; // e.g. '11-hearts'
  var rank = parseInt(card.split('-')[0]); // e.g. 11
  if (rank === 1 || rank > 10) {
    card = cardMap[rank] + '-' + card.split('-')[1]; // 11-hearts => jack-hearts
  }
  if (params.current.rank === 0) {
    setCurrentParams(id, rank, $img);
    $img.attr('src', 'img/cards/' + card + '.png');
  } else {
    if (id !== params.current.img.data('id')) {
      params.canFlip = false;
      $img.attr('src', 'img/cards/' + card + '.png');
      setTimeout(function() {
        var match = rank === params.current.rank;
        unflip([$img, params.current.img], match);
        if (callback) {
          callback(match);
        }
      }, 500);
    }
  }
};

var unflip = function(imgs, match) {
  if (match) {
    params.num -= 2;
    var id1 = imgs[0].data('id');
    var id2 = imgs[1].data('id');
    removePair(id1, id2);
    if (params.playerTurn) {
      params.playerFound += 1;
      updateView(false);
      appendPair(imgs);
    } else {
      params.computerFound += 1;
      updateView(true);
      appendPair(imgs, true);
    }
  }
  _.each(imgs, function(img) {
    if (match) {
      img.attr('src', 'img/blank.png');
      img.off();
    } else {
      img.attr('src', 'img/card-back.png');
    }
  });
  setCurrentParams(0, 0, null);
  params.canFlip = true;
};
