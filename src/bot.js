var bot_memory = {};
// optimization variable. computer doesn't need to revisit cards that are revealed
var checkedIds = [];

var resetMemory = function() {
  for (var i = 1; i < 14; i++) {
    bot_memory[i] = [];
  }
  checkedIds = [];
};
// initiaize memory when the page is loaded
resetMemory();

// using IIFE to break out of the inner forloop when that id is already stored
var addToMemory = function(id, rank) {
  (function() {
    var storedIds = bot_memory[rank];
    for (var i = 0; i < storedIds.length; i++) {
      var storedId = storedIds[i];
      if (id === storedId) {
        return;
      }
    }
    bot_memory[rank].push(id);
    checkedIds.push(id);
    return;
  }());
};

// when match happens, this function removes those ids from memory
var removeFromMemory = function(id1, id2) {
  for (var key in bot_memory) {
    var storedIds = bot_memory[key];
    for (var i = 0; i < storedIds.length; i++) {
      var storedId = storedIds[i];
      if (id1 === storedId || id2 === storedId) {
        storedIds.splice(i, 1);
        i--;
      }
    }
  }
  return;
};

// using IIFE to break out of the inner forloop when computer knows which card to flip
var searchFromMemory = function(firstFlip) {
  return (function() {
    // search through the memory and see if there is any ranks that have 2 or more ids
    for (var key in bot_memory) {
      var storedIds = bot_memory[key];
      if (storedIds.length > 1) {
        if (firstFlip) {
          return storedIds[0];
        } else {
          var currentId = params.current.id;
          for (var i = 0; i < storedIds.length; i++) {
            var storedId = storedIds[i];
            if (currentId !== storedId) {
              return storedId;
            }
          }
        }
      }
    }
    // if memory does not help, randomly generate id
    for (var i = 0; i < 1; i++) {
      var random = Math.floor(Math.random() * params.cards.length);
      var id = params.cards[random].id;
      var contains = _.contains(checkedIds, id);
      // if that id is revealed already, generate id again
      if (contains) {
        i--;
      } else {
        return id;
      }
    }
  }());
};
