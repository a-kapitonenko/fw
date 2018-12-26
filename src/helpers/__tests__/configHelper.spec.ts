import { setUserId, getUserId } from '../configHelper';
import * as mockData from '../../mockData';

describe('configHelper', () => {
  const id: string = mockData.id;

  it('sets the value of id', () => {
    localStorage.clear();
    setUserId(id);

    expect(localStorage.store).toEqual({ 'id': id });
  });

  describe('test getUserId function', () => {
    it("gets the value of id", () => {
      const item = localStorage.getItem('id');

      expect(getUserId()).toEqual(item);
    });

    it("return undefined if requested item doesn't exist", () => {
      localStorage.clear();

      const item = localStorage.getItem('id');
    
      expect(getUserId()).toEqual(item);
    });
  });
});

