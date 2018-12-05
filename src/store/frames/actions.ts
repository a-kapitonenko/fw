import { action } from 'typesafe-actions';
import { FramesActionTypes, Frame, ErrorTypes } from './types';
import { Boss } from '../order/types';

export const fetchRequest = () => action(FramesActionTypes.FETCH_REQUEST);
export const closeRequest = () => action(FramesActionTypes.CLOSE_REQUEST);
export const setError = (type: ErrorTypes, error: string) => action(FramesActionTypes.SET_ERROR, { type, error });
export const clearError = (type: ErrorTypes) => action(FramesActionTypes.CLEAR_ERROR, type);
export const fetchSimilarFrames = (boss: Boss) => action(FramesActionTypes.FETCH_SIMILAR_FRAMES, boss);
export const fetchSubmit = (boss: Boss, frame: Frame) => action(FramesActionTypes.FETCH_SUBMIT, { boss, frame });
export const open = () => action(FramesActionTypes.OPEN);
export const close = () => action(FramesActionTypes.CLOSE);
export const setStep = (step: number) => action(FramesActionTypes.SET_STEP, step);
export const setSelectedFrame = (frame: Frame) => action(FramesActionTypes.SET_SELECTED_FRAME, frame);
export const resetSelectedFrame = () => action(FramesActionTypes.RESET_SELECTED_FRAME);
export const setSimilarFrames = (frames: Frame[]) => action(FramesActionTypes.SET_SIMILAR_FRAMES, frames);
export const resetSimilarFrames = () => action(FramesActionTypes.RESET_SIMILAR_FRAMES);
