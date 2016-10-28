import React, { Component, PropTypes,  } from 'react';
import ReactDOM, { render, } from 'react-dom';
// import { Router, Route, /* Link, IndexRoute,*/ browserHistory, hashHistory, } from 'react-router';
import bankStore from './bankStore';
import constants from './constants';
import bankActionCreators from './bankActionCreators';
import { connect, Provider, } from 'react-redux';

class BankApp extends Component{
  handleDeposit() {
    // console.log('this.refs',this.refs)
    this.props.onDeposit(this.refs.amount.value);
    this.refs.amount.value = '';
  }
  handleWithdraw() {
    this.props.onWithdraw(this.refs.amount.value);
    this.refs.amount.value = '';
  }
  render() {
    return (
      <div>
        <header><img src="//www.pro-react.com/logos/redux-bank.svg" width="150"/>Redux Bank</header>
        <h1>Your balance is ${(this.props.balance).toFixed(2) }</h1>
        {/*<h2>Your Points Rewards Tier is { this.props.rewardsTier }</h2>*/}
        <div className="atm">
          <input type="text" placeholder="Enter Amount" ref="amount" />
          <br />
          <button onClick={this.handleWithdraw.bind(this) }>Withdraw</button>
          <button onClick={this.handleDeposit.bind(this) }>Deposit</button>
        </div>
        <div className="exchange" onClick={this.props.onToggle}>
          <strong>Exchange Rates: </strong>
          <div className={this.props.showInfo ? 'exchange--visible' : 'exchange--closed'}>
            <strong>$1 USD=</strong>
            <span className="rate">0.9990 EUR</span>
            <span className="rate">0.7989 GBP</span>
            <span className="rate">710.15 JPY</span>
          </div>  
        </div>
      </div>
    );
  }
}
BankApp.propTypes = {
  balance: PropTypes.number,
  onDeposit: PropTypes.func,
  onWithdraw: PropTypes.func,
  onToggle: PropTypes.func,
};


const mapStateToProps = (state) => {
  return {
    balance: state.balance,
    showInfo: state.ui.showInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeposit:(amount) => bankStore.dispatch(bankActionCreators.depositIntoAccount(amount)),
    onWithdraw:(amount) => bankStore.dispatch(bankActionCreators.withdrawFromAccount(amount)),
    onToggle:() => bankStore.dispatch(bankActionCreators.toggleInfo()),
  };
};
const BankAppContainer = connect(mapStateToProps, mapDispatchToProps)(BankApp);

render(<Provider store={bankStore}>
  <BankAppContainer/>
</Provider>, document.querySelector('#root'));
//https://github.com/pro-react/kanban-app/tree/chapter1
