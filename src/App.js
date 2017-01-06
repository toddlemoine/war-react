import React, { Component } from 'react';
import Gametable from './Gametable';
import NewGameButton from './NewGameButton.js';
import DealButton from './DealButton.js';
import PlayerHand from './PlayerHand.js';
import './App.css';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      message: '',
      players: [
        {name: 'A', cards:[], hand: []},
        {name: 'B', cards:[], hand: []}
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
          <DealButton />
          <PlayerHand player={state.players[1]} />
      </div>


        </Gametable>
      </main>
    );
  }
}

export default App;
