import React, { Component } from 'react';
import Gametable from './Gametable';
import NewGameButton from './NewGameButton.js';
import DealButton from './DealButton.js';
import PlayerHand from './PlayerHand.js';
import { buildDeck, shuffle, deal } from './deckUtils.js';
import './App.css';

class App extends Component {
  constructor(...args) {
    super(...args);

    // Deal cards
    const cards = shuffle(buildDeck());
    const hands = deal(cards, 2);

    this.state = {
      message: '',
      players: [
        {name: 'A', cards:hands[0], hand: []},
        {name: 'B', cards:hands[1], hand: []}
      ]
    }
  }

  render() {
    const { state, props } = this;

    return (
      <main>
        <Gametable>
          <header>
            <NewGameButton />
          <p>{state.message}</p>
        </header>
        <div className="players">
          <PlayerHand player={state.players[0]} />
          <div>
          <DealButton />
        </div>
          <PlayerHand player={state.players[1]} />
      </div>


        </Gametable>
      </main>
    );
  }
}

export default App;
