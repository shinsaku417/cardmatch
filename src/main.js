$(function() {
  var init = function() {
    updateView();
    makeBoard();
    params.cards = shuffle();
    // add click events to the cell based on the mode
    _.each($('img'), function(cell) {
      var $cell = $(cell);
      if (params.computer) {
        $cell.click(vsBotFlip);
      } else {
        $cell.click(singlePlayerFlip);
      }
    });
  };

  // add functionalities to menu buttons
  var setButtons = function() {
    var reset = function() {
      $('tbody').empty();
      $('.pairs').empty();
      resetParams();
      resetMemory();
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

  // when the page is loaded, initialize and add functionalities to buttons
  init();
  setButtons();

});
