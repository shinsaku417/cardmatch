// function that shuffles the deck and set it to the parameter
var shuffle = function() {
  for (var i = 0; i < params.num; i++) {
    var card = i % 13 + 1;
    if (i % 4 === 0) {
      card += '-clubs';
    }
    if (i % 4 === 1) {
      card += '-diamonds';
    }
    if (i % 4 === 2) {
      card += '-hearts';
    }
    if (i % 4 === 3) {
      card += '-spades';
    }
    params.cards.push(card);
  }
  return _.shuffle(params.cards);
};

var flip = function() {
  if (params.canFlip ) {
    var $img = $(this);
    var id = $img.data('id');
    var card = params.cards[id]; // e.g. '11-hearts'
    var rank = parseInt(card.split('-')[0]);
    if (rank === 1 || rank > 10) {
      card = cardMap[rank] + '-' + card.split('-')[1];
    }
    if (params.current.rank === 0) {
      params.current.rank = rank;
      params.current.img = $img;
      $img.attr('src', 'img/cards/' + card + '.png');
    } else {
      if (id !== params.current.img.data('id')) {
        params.canFlip = false;
        $img.attr('src', 'img/cards/' + card + '.png');
        setTimeout(function() {
          unflip([$img, params.current.img], rank === params.current.rank);
        }, 500);
      }
    }
  }
};

var unflip = function(imgs, match) {
  if (match) {
    params.found += 1;
    params.num -= 2;
    appendPair(imgs);
    updateView();
  }
  _.each(imgs, function(img) {
    if (match) {
      img.attr('src', 'img/blank.png');
      img.off();
    } else {
      img.attr('src', 'img/card-back.png');
    }
  });
  params.current.img = null;
  params.current.rank = 0;
  params.canFlip = true;
};
