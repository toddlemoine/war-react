import React from 'react';
import Card from './Card';

export default function PlayerHand({ player }) {

  const cards = player.cards.map( card => {
    return <Card />
  });

  const hand = player.hand.map( ( card, index ) => {
    return <Card shown={ index % 2 == 0 } value={card} />
  });

  return (
    <div className="player">
      <header>{ player.name }</header>
      <div className="cards">
      {cards}
    </div>
      <div className="current-hand">
      {hand}
    </div>
    </div>
  )
}
