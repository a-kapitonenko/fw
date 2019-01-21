import * as searchActions from '../actions';
import { Boss } from '../../order/types';
import { Frame } from '../../frames/types';
import * as mockData from '../../../mockData';

describe('search actions', () => {
  it('test searchStart action creator', () => {
    const boss: Boss = mockData.boss;
    const upc: string = '82850523738';

    expect(searchActions.searchStart(boss, upc)).toMatchSnapshot();
  });

  it('test searchSuccess action creator', () => {
    const frames: Frame [] = mockData.frames;

    expect(searchActions.searchSuccess(frames)).toMatchSnapshot();
  });

  it('test searchFailed action creator', () => {
    const message: string = mockData.errorMessage;

    expect(searchActions.searchFailed(message)).toMatchSnapshot();
  });

  it('test setSelectedFrames action creator', () => {
    const frames: Frame [] = mockData.frames;

    expect(searchActions.setSelectedFrames(frames)).toMatchSnapshot();
  });

  it('test clearResult action creator', () => {
    expect(searchActions.clearResult()).toMatchSnapshot();
  });
});
