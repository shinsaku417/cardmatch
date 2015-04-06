$(function() {
  var init = function() {
    resetParams();
    updateView();
    makeBoard();
    params.cards = shuffle();
    _.each($('img'), function(cell) {
      var $cell = $(cell);
      $cell.click(flip);
    });
  };

  init();

  $('.reset').click(function() {
    $('tbody').empty();
    init();
  });
});
