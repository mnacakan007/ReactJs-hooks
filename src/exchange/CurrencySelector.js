import React from "react";

class CurrencySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quote: ''};

    this.handleChange = this.handleChange.bind(this);
    this.sliceValue = this.sliceValue.bind(this);
  }

  handleChange(event) {
    this.props.onCurrencyChange(event.target.value);
    this.setState({quote: event.target.value})
  }

  sliceValue(value) {
    return value.slice(3)
  }

  render() {
    let obj = this.props?.currency;

    let currency = Object.keys(obj);
    currency.sort(function(a, b) { return obj[b] - obj[a] });

    return (
      <form>
        <label style={{marginRight: '5px'}} className={this.props.right ? 'align-right' : ''}>
          <select value={this.state.quote} onChange={this.handleChange}>
            {currency.map(value => {
              return <option key={value} value={this.sliceValue(value)}>{this.sliceValue(value)}</option>
            })}
          </select>
        </label>
      </form>
    );
  }
}

export default CurrencySelector
