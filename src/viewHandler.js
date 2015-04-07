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

var updateView = function(computer) {
  if (computer) {
    var $found = $('.computer').find('.found');
    $found.text(params.computerFound);
  } else {
    var $found = $('.player').find('.found');
    $found.text(params.playerFound);
  }
  var $remaining = $('.remaining');
  $remaining.text(params.num);
  if (params.num === 0) {
    alert('You found all pairs!');
  }
};

var appendPair = function(imgs, computer) {
  if (computer) {
    var $matches = $('.computer').find('.matches');
  } else {
    var $matches = $('.player').find('.matches');
  }
  $matches.append('<div>')
  _.each(imgs, function(img) {
    var $clone = img.clone();
    $clone.addClass('match');
    $matches.append($clone);
  });
  $matches.append('</div>');
};
