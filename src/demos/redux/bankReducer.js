import constants from './constants';
import { combineReducers, } from 'redux';
import update from 'react-addons-update';

const initialState = {
  initialBalance: 0,
  initialUI: {
    showInfo:true,
  },
  lastTransaction: new Date(),
};

const balanceReducer = (state = initialState.initialBalance, action) => {
  switch (action.type) {
  case constants.DEPOSITED_INTO_ACCOUNT:
    return {
      balance: state.balance + parseFloat(action.amount),
      lastTransaction: new Date(),
      lastDepositTransaction: new Date(),
    };
  case constants.WITHDREW_FROM_ACCOUNT:
    return {
      balance: state.balance - parseFloat(action.amount),
      lastTransaction: new Date(),
      lastWithdrewTransaction: new Date(),
    };
  default:
    return state;
  }
};

const uiReducer = (state = initialState.initialUI, action) => {
  switch (action.type) {
  case constants.TOGGLE_INFO:
    return update(state, { showInfo: { $apply: currentState => !currentState, }, });
  default:
    return state;
  }  
};

const bankReducer = combineReducers({ balance: balanceReducer, ui: uiReducer, });

export default bankReducer;
