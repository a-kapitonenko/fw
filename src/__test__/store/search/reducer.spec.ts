import { SearchActionTypes } from '../../../store/search/types';
import { SearchReducer } from '../../../store/search/reducer';
import { Frame } from '../../../store/frames/types';
import * as mockData from '../../mockData';

describe('search reducer', () => {
  it('test handles SEARCH_START', () => {
    const searchAction = {
      type: SearchActionTypes.SEARCH_START,
      payload: {},
    };
    
    expect(SearchReducer(undefined, searchAction)).toMatchSnapshot();
  });

  it('test handles SEARCH_SUCCESS', () => {
    const searchPayload: Frame[] = mockData.frames;

    const searchAction = {
      type: SearchActionTypes.SEARCH_SUCCESS,
      payload: searchPayload,
    };

    expect(SearchReducer(undefined, searchAction)).toMatchSnapshot();
  });

  it('test handles SEARCH_FAILED', () => {
    const searchPayload = 'Error message';

    const searchAction = {
      type: SearchActionTypes.SEARCH_FAILED,
      payload: searchPayload,
    };

    expect(SearchReducer(undefined, searchAction)).toMatchSnapshot();
  });

  it('test handles SET_SELECTED_FRAMES', () => {
    const searchPayload: Frame[] = mockData.frames;

    const searchAction = {
      type: SearchActionTypes.SET_SELECTED_FRAMES,
      payload: searchPayload,
    };

    expect(SearchReducer(undefined, searchAction)).toMatchSnapshot();
  });

  it('test handles CLEAR_RESULT', () => {
    const searchAction = {
      type: SearchActionTypes.CLEAR_RESULT,
      payload: {},
    };

    expect(SearchReducer(undefined, searchAction)).toMatchSnapshot();
  });
});
