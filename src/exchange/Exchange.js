import React from "react";
import mainLogo from '../assets/324014-200.png';
import ExchangeInput from "./ExchangeInput";
import getCurrency from "./getCurrency";

function toMoney(money = 0, course) {
  if (!money) {
    return 0
  }
  return Math.round(money * course * 100) / 100
}

function calcCourse(curr1, curr2) {
  return curr1 / curr2;
}

export class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCurrencyChange1 = this.handleCurrencyChange1.bind(this);
    this.handleCurrencyChange2 = this.handleCurrencyChange2.bind(this);
    this.handleExchangeMoney1 = this.handleExchangeMoney1.bind(this);
    this.handleExchangeMoney2 = this.handleExchangeMoney2.bind(this);

    this.state = {
      money1: 0,
      money2: 0,
      quote1: 'AMD',
      quote2: 'AMD',
      course1: 0,
      course2: 0,
      input1: 0,
      input2: 0,
      leftInputIsChange: false,
      rightInputIsChange: false,
      leftSelectIsChange: false,
      rightSelectIsChange: false,
      currency: {
        USDAMD: 0,
        USDEUR: 0,
        USDRUB: 0,
        USDGBP: 0,
        USDUSD: 0
      },
    };
  }

  componentDidMount() {
    this.getCurrency();
  }

  handleCurrencyChange1(quote) {
    return this.setState({quote1: quote});
  }

  handleCurrencyChange2(quote) {
    return this.setState({quote2: quote});
  }

  handleExchangeMoney1(money) {
    this.setState({money2: 0});
    this.setState({money1: money});
  }

  handleExchangeMoney2(money) {
    this.setState({money1: 0});
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

    console.log(this.state);

    return (
      <div>
        <h1 style={{textAlign: 'center', marginTop: '10px'}}>Exchange</h1>
        <div style={{margin: '0 auto', display: 'flex', justifyContent: 'space-between', maxWidth: '400px'}}>
          <ExchangeInput
            quote={quote1}
            money={input1}
            currency={this.state.currency}
            onExchangeMoney={this.handleExchangeMoney1}
            onCurrencyChange={this.handleCurrencyChange1}/>
          <img style={{
            width: '40px',
            height: '40px',
            position: 'absolute',
            left: '0',
            right: '0',
            margin: '0 auto',
            top: '120px'
          }} src={mainLogo} alt="exchange.png"/>
          <ExchangeInput
            quote={quote2}
            money={input2}
            currency={this.state.currency}
            right={true}
            onExchangeMoney={this.handleExchangeMoney2}
            onCurrencyChange={this.handleCurrencyChange2}/>
        </div>
      </div>
    );
  }
}
