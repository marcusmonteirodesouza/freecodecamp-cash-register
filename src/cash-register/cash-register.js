/**
 * @constructor {string} currencyUnitName must be a valid currency unit name
 */
export class CurrencyUnit {
  static validCurrencyUnitNames = {
    PENNY: 'PENNY',
    NICKEL: 'NICKEL',
    DIME: 'DIME',
    QUARTER: 'QUARTER',
    DOLLAR: 'DOLLAR',
    FIVE: 'FIVE',
    TEN: 'TEN',
    TWENTY: 'TWENTY',
    ONE_HUNDRED: 'ONE HUNDRED'
  };

  constructor(currencyUnitName) {
    if (!this.isValidCurrencyUnitName(currencyUnitName)) {
      throw new Error(
        `invalid currencyUnitName ${currencyUnitName}. must be one of [${Object.values(
          this.validCurrencyUnitNames
        ).join(', ')}]`
      );
    }
  }

  /**
   * Validates if the argument is a valid USA currency unit name
   * @param {string} currencyUnitName
   * @returns {boolean}
   */
  static isValidCurrencyUnitName = currencyUnitName => {
    currencyUnitName = currencyUnitName.toUpperCase().trim();

    return currencyUnitName in this.validCurrencyUnitNames;
  };
}

/**
 *
 * @param {number} price
 * @param {number} cash
 * @param {Array} cid a 2D Array with format [[string, amount]] where string must
 * be one valid argument to construct a CurrencyUnit class.
 */
export const checkCashRegister = (price, cash, cid) => {
  const changeAmount = cash - price;
  console.log(changeAmount);
  return cid;
};
