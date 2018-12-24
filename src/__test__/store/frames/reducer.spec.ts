import { FramesActionTypes, Frame } from '../../../store/frames/types';
import { FramesReducer } from '../../../store/frames/reducer';
import * as mockData from '../../mockData';

describe('frames reducer', () => {
  it('test handles OPEN', () => {
    const framesAction = {
      type: FramesActionTypes.OPEN,
      payload: {},
    };
    
    expect(FramesReducer(undefined, framesAction)).toMatchSnapshot();
  });

  it('test handles CLOSE', () => {
    const framesAction = {
      type: FramesActionTypes.CLOSE,
      payload: {},
    };
    
    expect(FramesReducer(undefined, framesAction)).toMatchSnapshot();
  });

  it('test handles SUBMIT_START', () => {
    const framesAction = {
      type: FramesActionTypes.SUBMIT_START,
      payload: {},
    };
    
    expect(FramesReducer(undefined, framesAction)).toMatchSnapshot();
  });

  it('test handles SUBMIT_SUCCESS', () => {
    const framesAction = {
      type: FramesActionTypes.SUBMIT_SUCCESS,
      payload: {},
    };
    
    expect(FramesReducer(undefined, framesAction)).toMatchSnapshot();
  });

  it('test handles SUBMIT_FAILED', () => {
    const framesPayload: string = mockData.errorMessage;

    const framesAction = {
      type: FramesActionTypes.SUBMIT_FAILED,
      payload: framesPayload,
    };
    
    expect(FramesReducer(undefined, framesAction)).toMatchSnapshot();
  });

  it('test handles FETCH_SIMILAR_FRAMES_START', () => {
    const framesAction = {
      type: FramesActionTypes.FETCH_SIMILAR_FRAMES_START,
      payload: {},
    };
    
    expect(FramesReducer(undefined, framesAction)).toMatchSnapshot();
  });

  it('test handles FETCH_SIMILAR_FRAMES_SUCCESS', () => {
    const framesPayload: Frame[] = mockData.frames;

    const framesAction = {
      type: FramesActionTypes.FETCH_SIMILAR_FRAMES_SUCCESS,
      payload: framesPayload,
    };
    
    expect(FramesReducer(undefined, framesAction)).toMatchSnapshot();
  });

  it('test handles FETCH_SIMILAR_FRAMES_FAILED', () => {
    const framesPayload: string = mockData.errorMessage;

    const framesAction = {
      type: FramesActionTypes.FETCH_SIMILAR_FRAMES_FAILED,
      payload: framesPayload,
    };
    
    expect(FramesReducer(undefined, framesAction)).toMatchSnapshot();
  });

  it('test handles CHECK_FRAME_START', () => {
    const framesAction = {
      type: FramesActionTypes.CHECK_FRAME_START,
      payload: {},
    };
    
    expect(FramesReducer(undefined, framesAction)).toMatchSnapshot();
  });

  it('test handles CHECK_FRAME_SUCCESS', () => {
    const framesAction = {
      type: FramesActionTypes.CHECK_FRAME_SUCCESS,
      payload: {},
    };
    
    expect(FramesReducer(undefined, framesAction)).toMatchSnapshot();
  });

  it('test handles CHECK_FRAME_FAILED', () => {
    const framesPayload: string = mockData.errorMessage;

    const framesAction = {
      type: FramesActionTypes.CHECK_FRAME_FAILED,
      payload: framesPayload,
    };
    
    expect(FramesReducer(undefined, framesAction)).toMatchSnapshot();
  });

  it('test handles SET_SELECTED_FRAME', () => {
    const framesPayload: Frame = mockData.frame;

    const framesAction = {
      type: FramesActionTypes.SET_SELECTED_FRAME,
      payload: framesPayload,
    };
    
    expect(FramesReducer(undefined, framesAction)).toMatchSnapshot();
  });

  it('test handles CLEAR_SELECTED_FRAME', () => {
    const framesAction = {
      type: FramesActionTypes.CLEAR_SELECTED_FRAME,
      payload: {},
    };
    
    expect(FramesReducer(undefined, framesAction)).toMatchSnapshot();
  });

  it('test handles CLEAR_RESULT', () => {
    const framesAction = {
      type: FramesActionTypes.CLEAR_RESULT,
      payload: {},
    };
    
    expect(FramesReducer(undefined, framesAction)).toMatchSnapshot();
  });
});
