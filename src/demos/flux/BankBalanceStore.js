import AppDispatcher from './AppDispatcher';
import { ReduceStore, } from 'flux/utils';
import bankConstants from './constants';

class  BankBalanceStore extends ReduceStore {
  getInitialState() {
    return 0;
  }
  reduce(state, action) {
    switch (action.type) {
      case bankConstants.CREATED_ACCOUNT:
        return 0;
      case bankConstants.DEPOSITED_INTO_ACCOUNT:
        return state + action.ammount;
      case bankConstants.WITHDREW_FROM_ACCOUNT:
        return state - action.ammount;
      default:
        return state;
    }  
  }
}

export default new BankBalanceStore(AppDispatcher);
