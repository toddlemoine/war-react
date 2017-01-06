import React from 'react';

const cardMap = {
  11: 'J',
  12: 'Q',
  13: 'K',
  14: 'A'
};

function getCardFromValue(value) {
  const suit = value.charAt(value.length-1);
  const parsedValue = parseInt(value, 10);
  const text = cardMap[parsedValue] || parsedValue;
  return { suit, text };
}

export default function Card({ value, shown, style }) {
  if (shown) {
    const card = getCardFromValue(value);

    return (
      <div className={`card ${card.suit}`} style={style}>
        <div className="wrapper">
        <div className="suit">{card.suit}</div>
        <div className="text">{card.text}</div>
      </div>
      </div>
    )
  }

  return <div className="card facedown" style={style}/>;
}
