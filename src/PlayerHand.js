import React from 'react';
import Card from './Card';

export default function PlayerHand({ player }) {

  const cards = player.cards.map( ( card, index ) => {
    const style = {
      transform: `translateY(-${index}px)`
    };
    return <Card key={index} style={style} value={card} shown={false} />
  });

  const hand = player.hand.map( ( card, index ) => {
    console.log('card', card)
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
