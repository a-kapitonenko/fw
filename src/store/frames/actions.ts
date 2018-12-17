import { action } from 'typesafe-actions';
import { FramesActionTypes, Frame } from './types';
import { Boss } from '../order/types';

export const open = () => action(FramesActionTypes.OPEN);
export const close = () => action(FramesActionTypes.CLOSE);

export const submitStart = (boss: Boss, frame: Frame) => action(FramesActionTypes.SUBMIT_START, { boss, frame });
export const submitSuccess = () => action(FramesActionTypes.SUBMIT_SUCCESS);
export const submitFailed = (message: string) => action(FramesActionTypes.SUBMIT_FAILED, message);

export const fetchSimilarFramesStart = (boss: Boss) => action(FramesActionTypes.FETCH_SIMILAR_FRAMES_START, boss);
export const fetchSimilarFramesSuccess = (frames: Frame[]) => action(FramesActionTypes.FETCH_SIMILAR_FRAMES_SUCCESS, frames);
export const fetchSimilarFramesFailed = (message: string) => action(FramesActionTypes.FETCH_SIMILAR_FRAMES_FAILED, message);

export const checkFrameStart = (boss: Boss) => action(FramesActionTypes.CHECK_FRAME_START, boss);
export const checkFrameSuccess = () => action(FramesActionTypes.CHECK_FRAME_SUCCESS);
export const checkFrameFailed = (message: string) => action(FramesActionTypes.CHECK_FRAME_FAILED, message);

export const setSelectedFrame = (frame: Frame) => action(FramesActionTypes.SET_SELECTED_FRAME, frame);
export const clearSelectedFrame = () => action(FramesActionTypes.CLEAR_SELECTED_FRAME);

export const clearResult = () => action(FramesActionTypes.CLEAR_RESULT);
