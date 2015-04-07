// function that shuffles the deck and returns it
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

// helper function to get cards given specific id
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

// removes pair from params.cards once there is a match
var removePair = function(first, second) {
  var cards = params.cards;
  _.each(cards, function(card, i) {
    if (card.id === first || card.id === second) {
      cards.splice(i, 1);
    }
  });
};

// generic flip function
var flip = function($img, callback) {
  var id = $img.data('id');
  var card = getCardWithId(id).name; // e.g. '11-hearts'
  var rank = parseInt(card.split('-')[0]); // e.g. 11
  // convert card's name to match png file name in img folder
  if (rank === 1 || rank > 10) {
    card = cardMap[rank] + '-' + card.split('-')[1]; // e.g. 11-hearts => jack-hearts
  }
  // add card-id to bot's memory
  addToMemory(id, rank);
  // if it is a first flip, set current (after 1st flip) parameters
  if (params.current.rank === 0) {
    setCurrentParams(id, rank, $img);
    $img.attr('src', 'img/cards/' + card + '.png');
  } else {
    // 2nd flip
    // check if we are not trying to flip the same card
    if (id !== params.current.img.data('id')) {
      params.canFlip = false;
      $img.attr('src', 'img/cards/' + card + '.png');
      // after 500ms, check if there is a match and call a callback function if there is one
      setTimeout(function() {
        var match = rank === params.current.rank;
        matchHandler([$img, params.current.img], match);
        if (callback) {
          callback(match);
        }
      }, 500);
    }
  }
};

// handles checking of the match between 2 flipped cards
var matchHandler = function(imgs, match) {
  // if there is a match
  if (match) {
    // remove number of remaining cards
    params.num -= 2;
    // remove pair of cards from params.cards and bot's memory
    var id1 = imgs[0].data('id');
    var id2 = imgs[1].data('id');
    removePair(id1, id2);
    removeFromMemory(id1, id2);
    // update view based on who's turn it was
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
  // for each image
  _.each(imgs, function(img) {
    // if there is a match, turn off click event and replace image with blank image
    if (match) {
      img.attr('src', 'img/blank.png');
      img.addClass('blank');
      img.off();
    } else {
      // put back the card if no match
      img.attr('src', 'img/card-back.png');
    }
  });
  // reset the current status
  setCurrentParams(0, 0, null);
  // player can now flip again
  params.canFlip = true;
};
