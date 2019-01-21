import { createFilterGroupsData, isEmptyNestedObject } from '../filterHelper';
import * as mockData from '../../mockData';
import { Groups } from '../../store/filter/types';

describe('filterHelper', () => {
  it('test createFilterGroupsData function', () => {
    const groups: Groups = mockData.groups;

    expect(createFilterGroupsData(groups)).toMatchSnapshot();
  });

  describe('test isEmptyNestedObject function', () => {
    const emptyObject: object = {};
    const filledObject: object = mockData.query;

    it('should return true for empty nested object', () => {
      expect(isEmptyNestedObject(emptyObject)).toEqual(true);
    });

    it('should return false for filled nested object', () => {
      expect(isEmptyNestedObject(filledObject)).toEqual(false);
    });
  });
});
