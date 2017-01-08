import React, { Component } from 'react';
import Gametable from './Gametable';
import NewGameButton from './NewGameButton.js';
import AutoPlayButton from './AutoPlayButton.js';
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
      wars: 0,
      winner: null,
      players: [
        {name: 'A', cards:hands[0], hand: []},
        {name: 'B', cards:hands[1], hand: []}
      ]
    }
  }

  newGame() {
    this.stopAutoPlay();

    const cards = shuffle(buildDeck());
    const hands = deal(cards, 2);

    this.setState({
      rounds: 0,
      wars: 0,
      winner: null,
      players: this.state.players.map(( player, index ) => {
        player.hand = [];
        player.cards = hands[index];
        return player;
      })
    })
  }

  autoPlay(rate = 10) {
    this.stopAutoPlay();
    this.autoPlayIntervalId = setInterval(() => {
      this.playRound();
    }, rate);
  }

  stopAutoPlay() {
    clearInterval( this.autoPlayIntervalId );
    this.autoPlayIntervalId = null;
  }

  gatherCardsWon(players, winner) {
    return players
      .filter(player => player !== winner)
      .map(player => player.hand.splice(0));
  }

  isGameOver(players) {
    return players.filter(player => player.cards.length > 0).length === 1;
  }

  playRound() {

    const { players, rounds, wars } = this.state;
    let war = false;

    // Clean up after last hand
    if (rounds > 0) {
      const winner = this.determineWinner(players);
      war = !winner;

      if (winner) {
        const cardsWon = this.gatherCardsWon(players, winner);
        winner.cards = winner.cards.concat(...cardsWon, ...winner.hand.splice(0));
      }

      if (this.isGameOver(players)) {
        this.stopAutoPlay();
        return this.setState({ winner });
      }
    }

    this.setState({
      players: players.map(player => {
        if (war) {
          player.hand = player.hand.concat(draw(player.cards, 2));
        } else {
          player.hand = draw(player.cards, 1);
        }
        return player;
      }),
      wars: wars + (war ? 1 : 0),
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

    if ( state.winner ) {
      message = `Game Over. ${state.winner.name} wins.`;
    }

    return (
      <main>
        <Gametable>
          <header>
            <NewGameButton onClick={this.newGame.bind(this)} />
            <AutoPlayButton
              onChange={(rate) => this.autoPlayIntervalId && this.autoPlay(rate)}
              onClick={this.autoPlay.bind(this)}
              disabled={this.autoPlayIntervalId} />
            <DealButton onClick={this.playRound.bind(this)} />
        </header>

        <div className="players">
          <PlayerHand player={state.players[0]} />
          <PlayerHand player={state.players[1]} />
        </div>

          <div className="status">
            { state.rounds } rounds ({state.wars} wars) {message}
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
