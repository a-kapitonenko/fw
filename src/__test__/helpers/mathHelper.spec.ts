import { isEmptyObject, isNumber } from '../../helpers/mathHelper';

const emptyObject: object = {};
const filledObject: object = { a: 10 };
const nestedObject: object = { a: {}};

const number: number = 10;
const string: string = 'test';
const array: any = [1, 2, 3, 'a', {}];
const empyArray: any = [];
const und: undefined = undefined;

describe('mathHelper', () => {
  it('should check empty objects', () => {
    expect(isEmptyObject(emptyObject)).toEqual(true);
    expect(isEmptyObject(filledObject)).toEqual(false);
    expect(isEmptyObject(nestedObject)).toEqual(false);
  });

  it('should check number', () => {
    expect(isNumber(number)).toEqual(true);
    expect(isNumber(string)).toEqual(false);
    expect(isNumber(array)).toEqual(false);
    expect(isNumber(empyArray)).toEqual(false);
    expect(isNumber(emptyObject)).toEqual(false);
    expect(isNumber(und)).toEqual(false);
  });
});
