import { isEmptyObject, isNumber } from '../mathHelper';

describe('mathHelper', () => {
  describe('test isEmptyObject function', () => {
    const emptyObject: object = {};
    const filledObject: object = { a: 10 };
    const nestedObject: object = { a: {} };

    it('should return true for empty object', () => {
      expect(isEmptyObject(emptyObject)).toEqual(true);
    });

    it('should return false for other cases', () => {
      expect(isEmptyObject(filledObject)).toEqual(false);
      expect(isEmptyObject(nestedObject)).toEqual(false);
    });
  });

  describe('test isNumber function', () => {
    const number: number = 10;
    const string: string = 'test';
    const array: any = [1, 2, 3, 'a', {}];
    const empyArray: any = [];
    const emptyObject: object = {};
    const und: undefined = undefined;

    it('should return true for number', () => {
      expect(isNumber(number)).toEqual(true);
    });

    it('should return false for other cases', () => {
      expect(isNumber(string)).toEqual(false);
      expect(isNumber(array)).toEqual(false);
      expect(isNumber(empyArray)).toEqual(false);
      expect(isNumber(emptyObject)).toEqual(false);
      expect(isNumber(und)).toEqual(false);
    });
  });
});
