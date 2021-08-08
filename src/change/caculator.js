import React from "react";

class CurrencySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quote: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onCurrencyChange(event.target.value);
    this.setState({quote: event.target.value})
  }

  render() {
    return (
      <form>
        <label style={{marginRight: '5px'}}>
          <select value={this.state.quote} onChange={this.handleChange}>
            <option value="AMD">AMD</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="RUB">RUB</option>
          </select>
        </label>
      </form>
    );
  }
}

function tryConvert(money, convert) {
  const input = parseFloat(money);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function toMoney1(money) {
  console.log('money1: ', money);
  return money * 490;
}

function toMoney2(money) {
  console.log('money2: ', money);
  return money / 490;
}

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
      <fieldset>
        <CurrencySelector onCurrencyChange={this.selectCurrency}/>
        <legend>Выберите вашу валюту: {quote}</legend>
        <input value={money}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

export class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCurrencyChange1 = this.handleCurrencyChange1.bind(this);
    this.handleCurrencyChange2 = this.handleCurrencyChange2.bind(this);
    this.handleExchangeMoney1 = this.handleExchangeMoney1.bind(this);
    this.handleExchangeMoney2 = this.handleExchangeMoney2.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
    this.state = { money: 0, currency: {
        USDAMD: 0,
        USDEUR: 0,
        USDRUB: 0,
        USDGBP: 0,
        USDUSD: 0
      }, quote: 'AMD'};
  }

  componentDidMount() {
    this.getCurrency();
  }

  getCurrency() {
    fetch('http://apilayer.net/api/live?access_key=2b1b329fd66a5a8e48d84dd8d0d03fba&currencies=EUR,GBP,RUB,AMD,USD&source=USD&format=1')
      .then(response => response.json())
      .then(currency => {
        this.setState({currency: currency.quotes});
        console.log(this.state);
      })
  }

  handleCurrencyChange1(quote) {
    // this.setState({quote});
  }

  handleCurrencyChange2(quote) {
    // this.setState({quote});
  }

  handleExchangeMoney1(money) {
    this.setState({quote: 'USD', money});
  }

  handleExchangeMoney2(money) {
    this.setState({quote: 'AMD', money});
  }

  render() {
    const quote = this.state.quote;
    const money = this.state.money;
    console.log(quote);
    console.log(money);

    let AMD = quote === 'AMD' ? tryConvert(money, toMoney1) : money;

    let USD = quote === 'USD' ? tryConvert(money, toMoney2) : money;

    return (
      <div style={{margin: '50px', display: 'flex', justifyContent: 'space-between'}}>
        <ExchangeInput
          quote='AMD'
          money={AMD}
          onExchangeMoney={this.handleExchangeMoney1}
          onCurrencyChange={this.handleCurrencyChange1}/>
        <ExchangeInput
          quote='USD'
          money={USD}
          onExchangeMoney={this.handleExchangeMoney2}
          onCurrencyChange={this.handleCurrencyChange2}/>
      </div>
    );
  }
}
