import request from './request';
import { Boss } from '../store/order/types';
import { Frame } from '../store/frames/types';
import { getSimilarFrames, onSubmit, checkFrameCompatibility } from '../test/frames';

export const fetchSimilarFramesRequest = (data : Boss) => request(getSimilarFrames, data);
export const submitRequest = (data: { boss: Boss, frame: Frame }) => request(onSubmit, data);
export const checkFrameRequest = (data: Boss) => request(checkFrameCompatibility, data); 
