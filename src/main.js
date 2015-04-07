$(function() {
  var init = function() {
    updateView();
    makeBoard();
    params.cards = shuffle();
    _.each($('img'), function(cell) {
      var $cell = $(cell);
      if (params.computer) {
        $cell.click(playerFlip);
      } else {
        $cell.click(singlePlayerFlip);
      }
    });
  };

  var setButtons = function() {
    var reset = function() {
      $('tbody').empty();
      $('.matches').empty();
      resetParams();
      init();
    };

    $('.reset').click(reset);

    $('.single').click(function() {
      params.computer = false;
      $('.mode').text('Single Player');
      reset();
    });

    $('.ai').click(function() {
      params.computer = true;
      params.playerTurn = true;
      $('.mode').text('Versus AI');
      reset();
    });
  };

  init();
  setButtons();

});
