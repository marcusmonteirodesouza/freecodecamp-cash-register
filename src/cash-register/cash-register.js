export class CurrencyUnit {
  static values = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    'ONE HUNDRED': 100
  };

  static unitNames() {
    return Object.keys(this.values);
  }

  static _treatUnitName(unitName) {
    return unitName.trim().replace(/\s\s+/g, ' ');
  }

  static isValidUnitName(unitName) {
    if (Object.keys(this.values).includes(this._treatUnitName(unitName))) {
      return true;
    }

    return false;
  }

  static getValue(unitName) {
    if (!this.isValidUnitName(unitName)) {
      throw new Error(`invalid unitName ${unitName}`);
    }

    return this.values[unitName];
  }

  static addFrom(value, unitName) {
    return Number((value + this.getValue(unitName)).toFixed(2));
  }

  static subtractFrom(value, unitName) {
    return Number((value - this.getValue(unitName)).toFixed(2));
  }
}

/**
 * Solution for https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register
 *
 * @param {number} price
 * @param {number} cash
 * @param {[[string, number]]} cid cash in drawer
 *
 * @returns {string, [[string, number]]} an object with status: "OPEN" | "INSUFFICIENT_FUNDS" | "CLOSED" and the `change` in currency units
 *
 * @example
 * > checkCashRegister(3.26, 100, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.1], ['QUARTER', 4.25], ['ONE', 90], ['FIVE', 55], ['TEN', 20], ['TWENTY', 60], ['ONE HUNDRED', 100]])
 *
 * {
 *  status: 'OPEN',
 *	change: [
 *    ['TWENTY', 60],
 *    ['TEN', 20],
 *	  ['FIVE', 15],
 *		['ONE', 1],
 *		['QUARTER', 0.5],
 *		['DIME', 0.2],
 *		['PENNY', 0.04]
 *	]
 * }
 */
export const checkCashRegister = (price, cash, cid) => {
  let changeAmount = cash - price;

  if (changeAmount < 0) {
    throw new Error(
      `cash must be greater than price. Received cash: ${cash}, price: ${price}`
    );
  }

  const makeResult = (status, change) => {
    return {
      status,
      change
    };
  };

  const _cid = cid;

  // Important!
  _cid.sort((a, b) => {
    return CurrencyUnit.getValue(b[0]) - CurrencyUnit.getValue(a[0]);
  });

  const change = [];

  for (const cashDrawer of _cid) {
    const unitName = cashDrawer[0];
    const changeUnit = [unitName, 0];

    while (
      changeAmount > 0 &&
      changeAmount >= CurrencyUnit.getValue(unitName) &&
      cashDrawer[1] > 0
    ) {
      changeAmount = CurrencyUnit.subtractFrom(changeAmount, unitName);
      cashDrawer[1] = CurrencyUnit.subtractFrom(cashDrawer[1], unitName);
      changeUnit[1] = CurrencyUnit.addFrom(changeUnit[1], unitName);
    }

    change.push(changeUnit);
  }

  if (changeAmount > 0) {
    return makeResult('INSUFFICIENT_FUNDS', []);
  }

  const cidTotal = cid => {
    return cid.map(cashDrawer => cashDrawer[1]).reduce((a, b) => a + b);
  };

  if (cidTotal(_cid) > 0) {
    // Descending
    change.sort((a, b) => {
      return CurrencyUnit.getValue(b[0]) - CurrencyUnit.getValue(a[0]);
    });
    return makeResult(
      'OPEN',
      change.filter(cashDrawer => cashDrawer[1] > 0)
    );
  }

  // Ascending
  change.sort((a, b) => {
    return CurrencyUnit.getValue(a[0]) - CurrencyUnit.getValue(b[0]);
  });
  return makeResult('CLOSED', change);
};
