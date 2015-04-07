var params = {
  num: 52,
  playerFound: 0,
  computerFound: 0,
  cards: [],
  playerTurn: true,
  canFlip: true,
  current: {
    id: 0,
    rank: 0,
    img: null
  },
  computer: false
};

var resetParams = function() {
  params.num = 52;
  params.playerFound = 0;
  params.computerFound = 0
  params.cards = [];
  playerTurn: true,
  params.canFlip = true;
  params.current = {
    id: 0,
    rank: 0,
    img: null
  };
};

var setCurrentParams = function(id, rank, img) {
  params.current.id = id;
  params.current.rank = rank;
  params.current.img = img;
};
