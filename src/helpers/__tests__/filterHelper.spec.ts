import { createFilterGroupsData, isEmptyQuery } from '../filterHelper';
import * as mockData from '../../mockData';
import { Groups } from '../../store/filter/types';

describe('filterHelper', () => {
  it('test createFilterGroupsData function', () => {
    const groups: Groups = mockData.groups;

    expect(createFilterGroupsData(groups)).toMatchSnapshot();
  });

  describe('test isEmptyQuery function', () => {
    const emptyQuery: object = {};
    const filledQuery: object = mockData.query;

    it('should return true for empty query', () => {
      expect(isEmptyQuery(emptyQuery)).toEqual(true);
    });

    it('should return false for filled query', () => {
      expect(isEmptyQuery(filledQuery)).toEqual(false);
    });
  });
});
