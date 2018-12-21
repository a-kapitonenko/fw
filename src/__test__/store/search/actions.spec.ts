import * as searchActions from '../../../store/search/actions';
import { Frame } from '../../../store/frames/types';
import { Boss } from '../../../store/order/types';
import * as mockData from '../../mockData';

describe('search actions', () => {
  it('test searchStart action creator', () => {
    const boss = {} as Boss;
    const upc = '82850523738';

    expect(searchActions.searchStart(boss, upc)).toMatchSnapshot();
  });

  it('test searchSuccess action creator', () => {
    const frames: Frame [] = mockData.frames;

    expect(searchActions.searchSuccess(frames)).toMatchSnapshot();
  });

  it('test searchFailed action creator', () => {
    const message: string = 'Error message';

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
