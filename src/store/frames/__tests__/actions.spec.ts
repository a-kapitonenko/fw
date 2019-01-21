import { Frame } from '../types';
import { Boss } from '../../order/types';
import * as framesActions from '../../frames/actions';
import * as mockData from '../../../mockData';

describe('frames actions', () => {
  it('test open action creator', () => {
    expect(framesActions.open()).toMatchSnapshot();
  });

  it('test close action creator', () => {
    expect(framesActions.close()).toMatchSnapshot();
  });

  it('test submitStart action creator', () => {
    const boss: Boss = mockData.boss;
    const frame: Frame = mockData.frame;

    expect(framesActions.submitStart(boss, frame)).toMatchSnapshot();
  });

  it('test submitSuccess action creator', () => {
   expect(framesActions.submitSuccess()).toMatchSnapshot();
  });

  it('test submitFailed action creator', () => {
    const message: string = mockData.errorMessage;

    expect(framesActions.submitFailed(message)).toMatchSnapshot();
  });

  it('test fetchSimilarFramesStart action creator', () => {
    const boss: Boss = mockData.boss;

    expect(framesActions.fetchSimilarFramesStart(boss)).toMatchSnapshot();
  });

  it('test fetchSimilarFramesSuccess action creator', () => {
    const frames: Frame[] = mockData.frames;

    expect(framesActions.fetchSimilarFramesSuccess(frames)).toMatchSnapshot();
  });

  it('test fetchSimilarFramesFailed action creator', () => {
    const message: string = mockData.errorMessage;

    expect(framesActions.fetchSimilarFramesFailed(message)).toMatchSnapshot();
  });

  it('test checkFrameStart action creator', () => {
    const boss: Boss = mockData.boss;

    expect(framesActions.checkFrameStart(boss)).toMatchSnapshot();
  });

  it('test checkFrameSuccess action creator', () => {
    expect(framesActions.checkFrameSuccess()).toMatchSnapshot();
  });

  it('test checkFrameFailed action creator', () => {
    const message: string = mockData.errorMessage;

    expect(framesActions.checkFrameFailed(message)).toMatchSnapshot();
  });
  
  it('test setSelectedFrame action creator', () => {
    const frame: Frame = mockData.frame;

    expect(framesActions.setSelectedFrame(frame)).toMatchSnapshot();
  });

  it('test clearSelectedFrame action creator', () => {
    expect(framesActions.clearSelectedFrame()).toMatchSnapshot();
  });

  it('test clearResult action creator', () => {
    expect(framesActions.clearResult()).toMatchSnapshot();
  });
});
