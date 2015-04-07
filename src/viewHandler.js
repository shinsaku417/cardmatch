// makes a board and appends it to tbody
var makeBoard = function() {
  var $tbody = $('tbody');

  for (var i = 0; i < 4; i++) {
    $tbody.append('<tr>');
    for (var j = 0; j < 13; j++) {
      $tbody.append('<td><img class="card" src="img/card-back.png" data-id="' + (i * 13 + j) + '"</td>');
    }
    $tbody.append('</tr>');
  }
};

// updates a view for
// # of pairs player found
// # of pairs computer found
// remaining # of cards
var updateView = function(computer) {
  var $playerFound = $('.player').find('.found');
  $playerFound.text(params.playerFound);

  var $compFound = $('.computer').find('.found');
  $compFound.text(params.computerFound);

  var $remaining = $('.remaining');
  $remaining.text(params.num);

  if (params.num === 0) {
    finish();
  }
};

// append pair of cards that are matched
var appendPair = function(imgs, computer) {
  if (computer) {
    var $pairs = $('.computer').find('.pairs');
  } else {
    var $pairs = $('.player').find('.pairs');
  }
  $pairs.append('<div>')
  _.each(imgs, function(img) {
    var $clone = img.clone();
    $clone.addClass('pair');
    $pairs.append($clone);
  });
  $pairs.append('</div>');
};

// handles the case when the game is finished
var finish = function() {
  if (params.computer) {
    var player = params.playerFound;
    var computer = params.computerFound;
    if (player > computer) {
      var message = 'You Win!';
    } else if (player < computer) {
      var message = 'You Lose!';
    } else {
      var message = 'Tie!';
    }
    alert('You found ' + player + ' pairs while computer found ' + computer + ' pairs. ' + message);
  } else {
    alert('You found all pairs!');
  }
  params.playerTurn = true;
};
