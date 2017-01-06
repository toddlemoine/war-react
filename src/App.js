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
      war: false,
      players: [
        {name: 'A', cards:hands[0], hand: []},
        {name: 'B', cards:hands[1], hand: []}
      ]
    }
  }

  handleDraw() {

    const { war } = this.state;

    const players = this.state.players.map(player => {
      if (war) {
        player.hand = player.hand.concat(draw(player.cards, 2));
      } else {
        // Add last played hand to cards first.
        player.cards = player.cards.concat(player.hand);
        // Draw new cards
        player.hand = draw(player.cards, 1);
      }
      return player;
    });

    this.setState({
      players,
      war: this.isWar(players)
    });
  }

  isWar(players) {
    return cardValue(last(players[0].hand)) == cardValue(last(players[1].hand));
  }


  render() {
    const { state, props } = this;

    const message = state.isWar ? 'War!' : '';

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


        </Gametable>
      </main>
    );
  }
}

export default App;
