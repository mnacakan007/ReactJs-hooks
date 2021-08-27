import React from "react";

class CurrencySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quote: ''};

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

function toMoney(money = 0, course) {
  return Math.round(money * course * 100) / 100
}

function calcCourse(curr1, curr2) {
  return curr1 / curr2;
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
        <input
          value={money}
          onChange={this.handleChange}/>
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

    this.state = {
      money1: 0, money2: 0, currency: {
        USDAMD: 0,
        USDEUR: 0,
        USDRUB: 0,
        USDGBP: 0,
        USDUSD: 0
      }, quote1: 'AMD', quote2: 'AMD', course1: 0, course2: 0
    };
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
    return this.setState({quote1: quote});
  }

  handleCurrencyChange2(quote) {
    return this.setState({quote2: quote});
  }

  handleExchangeMoney1(money) {
    this.setState({money1: money});
  }

  handleExchangeMoney2(money) {
    this.setState({money2: money});
  }

  render() {
    const quote1 = this.state.quote1;
    const quote2 = this.state.quote2;
    const money1 = this.state.money1;
    const money2 = this.state.money2;
    const course1 = this.state.currency['USD' + quote1];
    const course2 = this.state.currency['USD' + quote2];

    let input1, input2

    if (money1) {
      input2 = toMoney(money1, calcCourse(course2, course1)) ?? money1;
    } else if (money2) {
      input1 = toMoney(money2, calcCourse(course1, course2)) ?? money2;
    }

    console.log('input1 :', input1);
    console.log('input2: ', input2);

    console.log(this.state);

    return (
      <div style={{margin: '50px', display: 'flex', justifyContent: 'space-between'}}>
        <ExchangeInput
          quote={quote1}
          money={input1}
          onExchangeMoney={this.handleExchangeMoney1}
          onCurrencyChange={this.handleCurrencyChange1}/>
        <ExchangeInput
          quote={quote2}
          money={input2}
          onExchangeMoney={this.handleExchangeMoney2}
          onCurrencyChange={this.handleCurrencyChange2}/>
      </div>
    );
  }
}
