import React, { Component } from 'react';
import Gametable from './Gametable';
import NewGameButton from './NewGameButton.js';
import DealButton from './DealButton.js';
import PlayerHand from './PlayerHand.js';
import { buildDeck, shuffle, deal, draw, last, cardValue } from './deckUtils.js';
import './App.css';

class App extends Component {
  constructor(...args) {
    super(...args);

    // Deal cards
    const cards = shuffle(buildDeck());
    const hands = deal(cards, 2);

    this.state = {
      rounds: 0,
      players: [
        {name: 'A', cards:hands[0], hand: []},
        {name: 'B', cards:hands[1], hand: []}
      ]
    }
  }

  handleDraw() {

    const { players, rounds } = this.state;
    let war = false;

    // Clean up after last hand
    if (rounds > 0) {
      const winner = this.determineWinner(players);
      war = !winner;

      if (winner) {
        const cardsWon = players
          .filter(player => player != winner)
          .map(player => player.hand.splice(0));
        winner.cards = winner.cards.concat(...cardsWon, ...winner.hand);
      }
    }

    function drawCards(player, war) {
      if (war) {
        player.hand = player.hand.concat(draw(player.cards, 2));
      } else {
        player.hand = draw(player.cards, 1);
      }
      return player;
    }

    this.setState({
      players: players.map(player => drawCards(player, war)),
      rounds: rounds + 1
    });

  }

  isWar(players) {
    return cardValue(last(players[0].hand)) == cardValue(last(players[1].hand));
  }

  determineWinner(players) {
    const p1 = cardValue(last(players[0].hand));
    const p2 = cardValue(last(players[1].hand));

    if (p1 == p2)
      return null;

    return (p1 > p2) ? players[0] : players[1];
  }


  render() {
    const { state, props } = this;

    let message = '';
    if (this.isWar(state.players)) {
      message = `War!`;
    }

    return (
      <main>
        <Gametable>
          <header>
            <NewGameButton />
          <p>{message}</p>
        </header>
        <div className="players">
          <PlayerHand player={state.players[0]} />
          <div>
          <DealButton onClick={this.handleDraw.bind(this)} />
        </div>
          <PlayerHand player={state.players[1]} />
      </div>

          <div>
            Rounds: { state.rounds }
            {
              state.players
              .map(player => <p>{`Player ${player.name}: ${player.cards.length}`}</p>)
                }
          </div>

        </Gametable>
      </main>
    );
  }
}

export default App;
