import _ from 'lodash';

export function buildDeck() {
  const suits = 'SDCH'.split('');
  let deck = [];

  suits.forEach(suit => {
    for (let i=2; i<15; i++) {
      deck.push(i+suit);
    }
  });

  return deck;
}

export function shuffle(cards = []) {
  return _.shuffle(cards);
}

export function deal(cards = [], numberOfPlayers = 2) {
  let hands = [];
  let player = 0;

  while (cards.length) {
    if (!hands[player]) hands[player] = [];
    hands[player].push(cards.shift());
    if ( ++player > numberOfPlayers-1) player = 0;
  }

  return hands;
}

// export function draw(cards, numberToDraw = 1) {
// }
