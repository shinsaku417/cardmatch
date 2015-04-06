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

var updateView = function() {
  var $found = $('.found');
  var $remaining = $('.remaining');
  $found.text(params.found);
  $remaining.text(params.num);
  if (params.num === 0) {
    alert('You found all pairs!');
  }
};

var appendPair = function(imgs) {
  var $matches = $('.matches');
  $matches.append('<div>')
  _.each(imgs, function(img) {
    var $clone = img.clone();
    $clone.addClass('match');
    $matches.append($clone);
  });
  $matches.append('</div>');
};
