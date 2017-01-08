import React from 'react';

export default class AutoPlayButton extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      rate: -100
    }
  }
  handleRateChange(e) {
    const rate = this.rateNode.value*-1;
    this.setState({ rate });
    this.props.onChange(rate);
  }
  render() {
    const { props } = this;

    return (
      <div className="autoplay">
        <button className="autoplay" onClick={() => props.onClick(this.state.rate)} disabled={props.disabled}>{"\u25B6"} AutoPlay</button>
        <span className="rate-label">Slow</span>
        <input ref={node => this.rateNode = node} type="range" value={-this.state.rate} onChange={this.handleRateChange.bind(this)} step="50" min={-500} max={0} />
        <span className="rate-label">Fast</span>
      </div>
    )
  }
}
