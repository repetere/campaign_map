import constants from './constants';

const bankActionCreators = {
  /**
   * @param {number} amount to deposit
   */
  depositIntoAccount(amount) {
    return {
      type: constants.DEPOSITED_INTO_ACCOUNT,
      amount: amount,
    };
  },
  /**
   * @param {number} amountn to withdraw
   */
  withdrawFromAccount(amount) {
    return {
      type: constants.WITHDREW_FROM_ACCOUNT,
      amount: amount,
    };
  },
  toggleInfo() {
    return {
      type: constants.TOGGLE_INFO,
    };
  },
};

export default bankActionCreators;
