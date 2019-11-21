import { CashRegister, CurrencyUnit } from './cash-register';
import { checkCashRegister } from '.';

describe('CashRegister', () => {
  test('constructor', () => {
    const cashRegister = new CashRegister();
    expect(Object.keys(cashRegister.currencyUnits)).toStrictEqual(
      CurrencyUnit.validCurrencyUnitNames
    );
  });

  describe('operations', () => {
    let cashRegister;
    let penny;
    let nickel;
    let dime;
    let quarter;
    let dollar;
    let five;
    let ten;
    let twenty;
    let oneHundred;
    let units;

    beforeEach(() => {
      cashRegister = new CashRegister();

      penny = new CurrencyUnit(CurrencyUnit.PENNY);
      nickel = new CurrencyUnit(CurrencyUnit.NICKEL);
      dime = new CurrencyUnit(CurrencyUnit.DIME);
      quarter = new CurrencyUnit(CurrencyUnit.QUARTER);
      dollar = new CurrencyUnit(CurrencyUnit.DOLLAR);
      five = new CurrencyUnit(CurrencyUnit.FIVE);
      ten = new CurrencyUnit(CurrencyUnit.TEN);
      twenty = new CurrencyUnit(CurrencyUnit.TWENTY);
      oneHundred = new CurrencyUnit(CurrencyUnit.ONE_HUNDRED);

      units = [
        penny,
        nickel,
        dime,
        quarter,
        dollar,
        five,
        ten,
        twenty,
        oneHundred
      ];

      units.forEach(unit => {
        cashRegister.addCurrencyUnit(unit);
      });
    });

    test('addCurrencyUnit', () => {
      expect(cashRegister.currencyUnits.PENNY[0]).toBe(penny);
      expect(cashRegister.currencyUnits.ONE_HUNDRED[0]).toBe(oneHundred);

      cashRegister.addCurrencyUnit(dime);
      expect(cashRegister.currencyUnits.DIME.length).toBe(2);
    });

    test('takeCurrencyUnit', () => {
      let unit = cashRegister.takeCurrencyUnit(CurrencyUnit.DOLLAR);
      expect(cashRegister.currencyUnits.DOLLAR.length).toBe(0);
      expect(unit).toBe(dollar);

      unit = cashRegister.takeCurrencyUnit(CurrencyUnit.DOLLAR);
      expect(cashRegister.currencyUnits.DOLLAR.length).toBe(0);
      expect(unit).toBeNull();

      unit = cashRegister.takeCurrencyUnit(CurrencyUnit.TWENTY);
      expect(cashRegister.currencyUnits.TWENTY.length).toBe(0);
      expect(unit).toBe(twenty);
    });

    test('totalCash', () => {
      expect(cashRegister.totalCash()).toBe(
        units.map(u => u.value).reduce((a, b) => a + b)
      );
    });
  });
});

describe('checkCashRegister', () => {
  test('open', () => {
    expect(
      checkCashRegister(19.5, 20, [
        ['PENNY', 1.01],
        ['NICKEL', 2.05],
        ['DIME', 3.1],
        ['QUARTER', 4.25],
        ['ONE', 90],
        ['FIVE', 55],
        ['TEN', 20],
        ['TWENTY', 60],
        ['ONE HUNDRED', 100]
      ])
    ).toBe({ status: 'OPEN', change: [['QUARTER', 0.5]] });

    expect(
      checkCashRegister(3.26, 100, [
        ['PENNY', 1.01],
        ['NICKEL', 2.05],
        ['DIME', 3.1],
        ['QUARTER', 4.25],
        ['ONE', 90],
        ['FIVE', 55],
        ['TEN', 20],
        ['TWENTY', 60],
        ['ONE HUNDRED', 100]
      ])
    ).toBe({
      status: 'OPEN',
      change: [
        ['TWENTY', 60],
        ['TEN', 20],
        ['FIVE', 15],
        ['ONE', 1],
        ['QUARTER', 0.5],
        ['DIME', 0.2],
        ['PENNY', 0.04]
      ]
    });
  });

  test('insufficient funds', () => {
    expect(
      checkCashRegister(19.5, 20, [
        ['PENNY', 0.01],
        ['NICKEL', 0],
        ['DIME', 0],
        ['QUARTER', 0],
        ['ONE', 0],
        ['FIVE', 0],
        ['TEN', 0],
        ['TWENTY', 0],
        ['ONE HUNDRED', 0]
      ])
    ).toBe({ status: 'INSUFFICIENT_FUNDS', change: [] });

    expect(
      checkCashRegister(19.5, 20, [
        ['PENNY', 0.01],
        ['NICKEL', 0],
        ['DIME', 0],
        ['QUARTER', 0],
        ['ONE', 1],
        ['FIVE', 0],
        ['TEN', 0],
        ['TWENTY', 0],
        ['ONE HUNDRED', 0]
      ])
    ).toBe({ status: 'INSUFFICIENT_FUNDS', change: [] });
  });
  test('closed', () => {
    expect(
      checkCashRegister(19.5, 20, [
        ['PENNY', 0.5],
        ['NICKEL', 0],
        ['DIME', 0],
        ['QUARTER', 0],
        ['ONE', 0],
        ['FIVE', 0],
        ['TEN', 0],
        ['TWENTY', 0],
        ['ONE HUNDRED', 0]
      ])
    ).toBe({
      status: 'CLOSED',
      change: [
        ['PENNY', 0.5],
        ['NICKEL', 0],
        ['DIME', 0],
        ['QUARTER', 0],
        ['ONE', 0],
        ['FIVE', 0],
        ['TEN', 0],
        ['TWENTY', 0],
        ['ONE HUNDRED', 0]
      ]
    });
  });
});
