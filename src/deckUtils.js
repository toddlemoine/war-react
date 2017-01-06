import _ from 'lodash';

export function buildDeck() {
  const suits = 'SDCH'.split('');
  let deck = [];

  for (suit in suits) {
    for (let i=2; i<15; i++) {
      deck.push(i+suit);
    }
  }

  return deck;
}

export function shuffle(cards = []) {
  return _.shuffle(cards);
}

// export function draw(cards, numberToDraw = 1) {
// }
