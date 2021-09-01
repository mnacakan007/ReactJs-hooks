import React from "react";
import CurrencySelector from "./CurrencySelector";

class ExchangeInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.selectCurrency = this.selectCurrency.bind(this);
  }

  handleChange(e) {
    this.props.onExchangeMoney(e.target.value);
  }

  selectCurrency(quote) {
    this.props.onCurrencyChange(quote);
  }

  render() {
    const money = this.props.money;
    const quote = this.props.quote;

    return (
      <fieldset style={{margin: '30px 15px'}}>
        <CurrencySelector
          right={this.props.right}
          currency={this.props.currency}
          onCurrencyChange={this.selectCurrency}/>
        <legend style={{fontSize: '14px'}}>Selected currency: <span
          style={{fontWeight: 'bold', minWidth: '35px', display: 'inline-block'}}>{quote}</span>
        </legend>
        <input
          style={{maxWidth: '125px'}}
          placeholder={'0.00'}
          value={money}
          className={this.props.right ? 'marginLeft' : ''}
          onChange={this.handleChange}/>
      </fieldset>
    );
  }
}

export default ExchangeInput
