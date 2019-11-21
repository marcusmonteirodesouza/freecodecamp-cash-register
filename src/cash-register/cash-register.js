/**
 * @constructor {string} currencyUnitName must be a valid currency unit name
 */
export class CurrencyUnit {
  static PENNY = 'PENNY';
  static NICKEL = 'NICKEL';
  static DIME = 'DIME';
  static QUARTER = 'QUARTER';
  static DOLLAR = 'DOLLAR';
  static FIVE = 'FIVE';
  static TEN = 'TEN';
  static TWENTY = 'TWENTY';
  static ONE_HUNDRED = 'ONE_HUNDRED';

  /**
   * @type {Object} an object containing the value of each currency unit name as key
   *
   * @static
   * @memberof CurrencyUnit
   */
  static currencyUnitTable = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    DOLLAR: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    ONE_HUNDRED: 100
  };

  /**
   * @type {Array} an Array of strings containing the valid currency unit names
   *
   * @static
   * @memberof CurrencyUnit
   */
  static validCurrencyUnitNames = Object.keys(this.currencyUnitTable);

  /**
   * @type {string} the name of this CurrencyUnit
   *
   * @example 'DOLLAR'
   *
   * @memberof CurrencyUnit
   */
  currencyUnitName;

  /**
   * Validates if the argument is a valid USA currency unit name
   * @param {string} currencyUnitName
   * @returns {boolean}
   */
  static isValidCurrencyUnitName = currencyUnitName => {
    currencyUnitName = currencyUnitName.toUpperCase().trim();

    return CurrencyUnit.validCurrencyUnitNames.includes(currencyUnitName);
  };

  /**
   *
   * @param {string} currencyUnitName
   */
  constructor(currencyUnitName) {
    currencyUnitName = currencyUnitName.trim().replace(/\s\s+/g, '_');

    if (!CurrencyUnit.isValidCurrencyUnitName(currencyUnitName)) {
      throw new Error(
        `invalid currencyUnitName ${currencyUnitName}. must be one of [${Object.values(
          CurrencyUnit.validCurrencyUnitNames
        ).join(', ')}]`
      );
    }

    this.currencyUnitName = currencyUnitName;
  }

  /**
   * @returns {number} the value of this CurrencyUnit
   *
   * @example 0.25
   *
   * @memberof CurrencyUnit
   */
  value = () => this.currencyUnitTable[this.currencyUnitName];

  /**
   * Returns true if this CurrencyUnit can be considered bigger than the argument
   *
   * @param {CurrencyUnit} currencyUnit
   *
   * @returns {boolean}
   *
   * @memberof CurrencyUnit
   */
  gt = currencyUnit => {
    return this.value > currencyUnit.value;
  };

  /**
   * Returns true if this CurrencyUnit can be considered equal than the argument
   *
   * @param {CurrencyUnit} currencyUnit
   *
   * @returns {boolean}
   *
   * @memberof CurrencyUnit
   */
  eq = currencyUnit => {
    return this.value === currencyUnit.value;
  };

  /**
   * Returns true if this CurrencyUnit can be considered bigger or equal than the argument
   *
   * @param {CurrencyUnit} currencyUnit
   *
   * @returns {boolean}
   *
   * @memberof CurrencyUnit
   */
  gte = currencyUnit => {
    return this.value >= currencyUnit.value;
  };

  /**
   * Returns true if this CurrencyUnit can be considered smaller than the argument
   *
   * @param {CurrencyUnit} currencyUnit
   *
   * @returns {boolean}
   *
   * @memberof CurrencyUnit
   */
  lt = currencyUnit => {
    return this.value < currencyUnit.value;
  };

  /**
   * Returns true if this CurrencyUnit can be considered smaller or equal than the argument
   *
   * @param {CurrencyUnit} currencyUnit
   *
   * @returns {boolean}
   *
   * @memberof CurrencyUnit
   */
  lte = currencyUnit => {
    return this.value <= currencyUnit.value;
  };
}

export class CashRegister {
  /**
   * @type {string: [CurrencyUnit]} the currency units currently in the register, organized by name
   *
   * @memberof CashRegister
   */
  currencyUnits = {};

  constructor() {
    CurrencyUnit.validCurrencyUnitNames.forEach(name => {
      this.currencyUnits[name] = [];
    });
  }

  /**
   * @param {CurrencyUnit} currencyUnit an instance of the CurrencyUnit class
   *
   * @memberof CashRegister
   */
  addCurrencyUnit = currencyUnit => {
    if (!(currencyUnit instanceof CurrencyUnit)) {
      throw new TypeError(
        `argument must be a CurrencyUnit. Received ${currencyUnit}`
      );
    }

    this.currencyUnits[currencyUnit.currencyUnitName].push(currencyUnit);
  };

  removeCurrencyUnit = currencyUnitName => {
    if (this.currencyUnits[currencyUnitName]) {
      this.currencyUnits[currencyUnitName].pop();
    }
  };

  /**
   * @returns {number} the total cash in the CashRegister
   *
   * @memberof CashRegister
   */
  totalCash = () => {
    return Object.values(this.currencyUnits)
      .flat()
      .map(unit => unit.value)
      .reduce((a, b) => a + b);
  };
}

/**
 *
 * @param {number} price
 * @param {number} cash
 * @param {Array} cid a 2D Array with format [[string, amount]] where string must
 * be one valid argument to construct a CurrencyUnit class.
 *
 * @returns {Object} an object with the following format:
 * {
 *  status: 'OPEN' | 'INSUFFICIENT_FUNDS' | 'CLOSED',
 *  change: a 2D Array in the same format as the `cid` argument
 * }
 *
 * @example
 * checkCashRegister(19.5, 20,
 * [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.1],
 * ['QUARTER', 4.25], ['ONE', 90], ['FIVE', 55], ['TEN', 20],
 * ['TWENTY', 60], ['ONE HUNDRED', 100]]) === { status: 'OPEN', change: [['QUARTER', 0.5]] }
 */
export const checkCashRegister = (price, cash, cid) => {
  const changeAmount = cash - price;
  console.log(changeAmount);
  return cid;
};
